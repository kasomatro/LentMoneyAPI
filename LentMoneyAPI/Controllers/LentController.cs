using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LentMoneyAPI.Models;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace LentMoneyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /// <summary>
    /// This Controller cares about all the lent entrys you have
    /// </summary>
    public class LentController : ControllerBase
    {
        static List<LentEntry> lentEntrys = new List<LentEntry>();

     
        /// <summary>
        /// This method returns a list of all lent entrys you have created
        /// </summary>
        /// <returns>list of entrys</returns>
        // GET: api/Lent
        [HttpGet]
        public List<LentEntry> Get()
        {
            return lentEntrys;
        }

        /// <summary>
        /// This method returns the total amount about all entrys you have
        /// </summary>
        /// <returns>total amount of entrys</returns>
        //GET: api/GetTotalAmount
        [Route("/api/GetTotalAmount")]
        [HttpGet]
        public float GetTotalAmount()
        {
            return lentEntrys.Sum(e => e.Amount);
        }

        /// <summary>
        /// This method creates a new entry
        /// </summary>
        /// <param name="entry">Expects an entry Object</param>
        // POST: api/Lent
        [HttpPost]
        public LentEntry Post(LentEntry entry)
        {
            lentEntrys.Add(entry);
            return (entry);
        }

        /// <summary>
        /// this method deletes an entry
        /// </summary>
        /// <param name="id">id from entry you want to delete</param>
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public LentEntry Delete(int id)
        {
            var entry = lentEntrys.Where(e => e.entryID == id).FirstOrDefault();
            if (entry != null)
            {
                lentEntrys.Remove(entry);
            }

            return entry;

        }

    }
}
