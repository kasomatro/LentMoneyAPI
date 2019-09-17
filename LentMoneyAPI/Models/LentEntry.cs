using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LentMoneyAPI.Models
{
    //This class stores the Data of an lent Entry
    public class LentEntry
    {
        public static int ID = 0;
        public int entryID { get; private set; }
        public String Name { get; set; }
        public float Amount { get; set; }
        public DateTime LentDate { get; set; }

        public LentEntry()
        {
            entryID = ID;
            ID++;
        }

    }
}
