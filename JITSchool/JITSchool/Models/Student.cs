﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JITSchool.Models
{
    public class Student
    {
        public int studentId { get; set; }
        public string firstName { get; set; }

        public string lastName { get; set; }

        public string contactPerson { get; set; }

        public string contactNo { get; set; }

        public string emailAdress { get; set; }
        public DateTime dateOfBirth { get; set; }
        public int age { get; set; }
        public int classroom { get; set; }
    }
}
