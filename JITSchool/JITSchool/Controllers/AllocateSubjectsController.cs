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
    public class AllocateSubjectsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AllocateSubjectsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select AllocateSubjectId, Teacher, Subject
                            from dbo.AllocateSubjects";

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
        public JsonResult Post(AllocateSubject subject)
        {
            string query = @"
                           insert into dbo.AllocateSubjects
                           values (@Teacher, @Subject)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Development");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Teacher", subject.Teacher);
                    myCommand.Parameters.AddWithValue("@Subject", subject.Subject);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
        [HttpPut]
        public JsonResult Put(AllocateSubject subject)
        {
            string query = @"
                           update dbo.AllocateSubjects
                           set Teacher= @Teacher, Subject=@Subject
                            where AllocateSubjectId=@AllocateSubjectId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Development");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AllocateSubjectId", subject.AllocateSubjectId);
                    myCommand.Parameters.AddWithValue("@Teacher", subject.Teacher);
                    myCommand.Parameters.AddWithValue("@Subject", subject.Subject);
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
                           delete from dbo.AllocateSubjects
                            where AllocateSubjectId=@AllocateSubjectId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Development");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AllocateSubjectId", id);

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
