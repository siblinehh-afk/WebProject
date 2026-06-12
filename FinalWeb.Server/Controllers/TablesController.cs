using FinalWeb.Server.Data;
using FinalWeb.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinalWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TablesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TablesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetAll()
        {
            var tables = _context.Tables.ToList();
            return Ok(tables);
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetById(int id)
        {
            var table = _context.Tables.Find(id);
            if (table == null)
                return NotFound();
            return Ok(table);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Create(Table table)
        {
            _context.Tables.Add(table);
            _context.SaveChanges();
            return Ok(table);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(int id, Table table)
        {
            var existing = _context.Tables.Find(id);
            if (existing == null)
                return NotFound();

            existing.TableNumber = table.TableNumber;
            existing.Capacity = table.Capacity;
            existing.Location = table.Location;
            existing.IsAvailable = table.IsAvailable;
            existing.Description = table.Description;

            _context.SaveChanges();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            var table = _context.Tables.Find(id);
            if (table == null)
                return NotFound();

            _context.Tables.Remove(table);
            _context.SaveChanges();
            return Ok("Table deleted");
        }
    }
}