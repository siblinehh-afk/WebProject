using FinalWeb.Server.Data;
using FinalWeb.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinalWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MenuItemsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetAll()
        {
            var items = _context.MenuItems.ToList();
            return Ok(items);
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetById(int id)
        {
            var item = _context.MenuItems.Find(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Create(MenuItem item)
        {
            _context.MenuItems.Add(item);
            _context.SaveChanges();
            return Ok(item);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(int id, MenuItem item)
        {
            var existing = _context.MenuItems.Find(id);
            if (existing == null)
                return NotFound();

            existing.Name = item.Name;
            existing.Category = item.Category;
            existing.Price = item.Price;
            existing.Description = item.Description;
            existing.IsAvailable = item.IsAvailable;
            existing.ImagePath = item.ImagePath;

            _context.SaveChanges();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            var item = _context.MenuItems.Find(id);
            if (item == null)
                return NotFound();

            _context.MenuItems.Remove(item);
            _context.SaveChanges();
            return Ok("Menu item deleted");
        }
    }
}