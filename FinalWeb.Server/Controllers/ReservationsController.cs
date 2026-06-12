using FinalWeb.Server.Data;
using FinalWeb.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FinalWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Reservations — Admin sees all
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAll()
        {
            var reservations = _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Table)
                .ToList();
            return Ok(reservations);
        }

        // GET: api/Reservations/mine — Customer sees only their own
        [HttpGet("mine")]
        [Authorize]
        public IActionResult GetMine()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var reservations = _context.Reservations
                .Include(r => r.Table)
                .Where(r => r.UserId == userId)
                .ToList();
            return Ok(reservations);
        }

        // POST: api/Reservations — Customer creates reservation
        [HttpPost]
        [Authorize]
        public IActionResult Create(Reservation reservation)
        {
            // Conflict check: same table, same date, same time slot
            var conflict = _context.Reservations.FirstOrDefault(r =>
                r.TableId == reservation.TableId &&
                r.ReservationDate.Date == reservation.ReservationDate.Date &&
                r.TimeSlot == reservation.TimeSlot &&
                r.Status != "Cancelled");

            if (conflict != null)
                return BadRequest("This table is already booked for that date and time slot");

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            reservation.UserId = userId;
            reservation.Status = "Pending";

            _context.Reservations.Add(reservation);
            _context.SaveChanges();
            return Ok(reservation);
        }

        // PUT: api/Reservations/5 — Update status (confirm/cancel)
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Update(int id, Reservation reservation)
        {
            var existing = _context.Reservations.Find(id);
            if (existing == null)
                return NotFound();

            existing.Status = reservation.Status;
            existing.ReservationDate = reservation.ReservationDate;
            existing.TimeSlot = reservation.TimeSlot;
            existing.GuestCount = reservation.GuestCount;

            _context.SaveChanges();
            return Ok(existing);
        }

        // DELETE: api/Reservations/5 — Cancel reservation
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var reservation = _context.Reservations.Find(id);
            if (reservation == null)
                return NotFound();

            _context.Reservations.Remove(reservation);
            _context.SaveChanges();
            return Ok("Reservation deleted");
        }
    }
}