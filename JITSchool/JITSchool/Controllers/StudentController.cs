using JITSchool.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace JITSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public StudentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select StudentId, FirstName, LastName, ContactPerson, ContactNo, EmailAdress, DateofBirth, Age, Classroom 
                            from dbo.Student";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Development");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Student student)
        {
            string query = @"
                           insert into dbo.Student
                           values (@FirstName, @LastName, @ContactPerson, @ContactNo, @EmailAdress, @DateofBirth, @Age, @Classroom)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Development");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", student.firstName);
                    myCommand.Parameters.AddWithValue("@LastName", student.lastName);
                    myCommand.Parameters.AddWithValue("@ContactPerson", student.contactPerson);
                    myCommand.Parameters.AddWithValue("@ContactNo", student.contactNo);
                    myCommand.Parameters.AddWithValue("@EmailAdress", student.emailAdress);
                    myCommand.Parameters.AddWithValue("@DateofBirth", student.dateOfBirth);
                    myCommand.Parameters.AddWithValue("@Age", student.age);
                    myCommand.Parameters.AddWithValue("@Classroom", student.classroom);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
        [HttpPut]
        public JsonResult Put(Student student)
        {
            string query = @"
                           update dbo.Student
                           set FirstName= @FirstName, LastName = @LastName, ContactPerson = @ContactPerson,
                                 ContactNo =@ContactNo, EmailAdress = @EmailAdress, DateofBirth = @DateofBirth, Classroom =@Classroom
                            where StudentId=@StudentId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Development");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StudentId", student.studentId); 
                    myCommand.Parameters.AddWithValue("@FirstName", student.firstName);
                    myCommand.Parameters.AddWithValue("@LastName", student.lastName);
                    myCommand.Parameters.AddWithValue("@ContactPerson", student.contactPerson);
                    myCommand.Parameters.AddWithValue("@ContactNo", student.contactNo);
                    myCommand.Parameters.AddWithValue("@EmailAdress", student.emailAdress);
                    myCommand.Parameters.AddWithValue("@DateofBirth", student.dateOfBirth);
                    myCommand.Parameters.AddWithValue("@Classroom", student.classroom);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.Student
                            where StudentId=@StudentId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Development");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StudentId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
