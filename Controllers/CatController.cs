using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server;
using System.Linq;
using System.IO;
using System;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    public class CatController : Controller
    {
        public CatController()
        {

        }
        [HttpGet("random", Name = "GetRandom")]
        public IActionResult GetRandom()
        {
            string path = Path.Combine("~/images/cats/square/1.jpg");
            return base.File(path, "image/jpeg");
        }
        [HttpGet("{ratio}", Name = "GetRatio")]
        public IActionResult GetRatio(string ratio)
        {
            return base.File("file/path", "image/jpeg");
        }
        [HttpGet("{width}/{height}", Name = "GetDimension")]
        public IActionResult GetDimension(int width, int height)
        {
            return base.File("file/path", "image/jpeg");
        }
    }
}