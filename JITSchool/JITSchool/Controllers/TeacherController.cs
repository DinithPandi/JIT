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
    public class TeacherController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public TeacherController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select TeacherId, FirstName, LastName,  ContactNo, EmailAdress
                            from dbo.Teacher";

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
        public JsonResult Post(Teacher teacher)
        {
            string query = @"
                           insert into dbo.Teacher
                           values (@FirstName, @LastName,  @ContactNo, @EmailAdress)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Development");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", teacher.firstName);
                    myCommand.Parameters.AddWithValue("@LastName", teacher.lastName);
                    myCommand.Parameters.AddWithValue("@ContactNo", teacher.contactNo);
                    myCommand.Parameters.AddWithValue("@EmailAdress", teacher.emailAdress);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
        [HttpPut]
        public JsonResult Put(Teacher teacher)
        {
            string query = @"
                           update dbo.Teacher
                           set FirstName= @FirstName, LastName = @LastName, ContactNo =@ContactNo, EmailAdress = @EmailAdress
                            where TeacherId=@TeacherId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Development");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@TeacherId", teacher.teacherId);
                    myCommand.Parameters.AddWithValue("@FirstName", teacher.firstName);
                    myCommand.Parameters.AddWithValue("@LastName", teacher.lastName);
                    myCommand.Parameters.AddWithValue("@ContactNo", teacher.contactNo);
                    myCommand.Parameters.AddWithValue("@EmailAdress", teacher.emailAdress);
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
                           delete from dbo.Teacher
                            where TeacherId=@TeacherId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Development");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@TeacherId", id);

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
