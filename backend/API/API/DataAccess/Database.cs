using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using API.Common;

namespace API.DataAccess
{
    /// <summary>
    /// Summary description for Database
    /// THIS IS THE CLASS TO HOLD ALL CONNECTION & SQL QUERY METHOD
    /// </summary>
    public class Database
    {
        #region Private Attribute
        private int commandTimeout = 0;
        private int connectionTimeout = 0;
        private bool beginTransaction = false;
        private string connectionString = null;
        private SqlConnection connection = null;
        private SqlTransaction transaction = null;
        #endregion

        #region Constructor
        public Database()
        {
            //
            // TODO: Add constructor logic here
            //
        }
        public Database(string connectionString)
        {

            this.connectionString = connectionString;
        }
        #endregion

        #region Basic Method
        private string GetConnectionString()
        {
            try
            {
                if (Common.Common.IsNull(this.connectionString))
                {
                    return PropertyManager.GetSystemConfig("ConnectionString", "") + ";Connection Timeout=" + this.connectionTimeout;
                }
            }
            catch
            {
            }

            return this.connectionString;
        }

        public void OpenConnection()
        {
            try
            {
                if (this.connection == null)
                {
                    this.connection = new SqlConnection(GetConnectionString());
                    this.connection.Open();
                }
                else
                {
                    if (this.connection.State == ConnectionState.Closed)
                    {
                        this.connection.Open();
                    }
                }

                if (this.beginTransaction)
                {
                    if (this.connection != null)
                    {
                        this.transaction = this.connection.BeginTransaction(IsolationLevel.Serializable);
                        this.beginTransaction = false;
                    }
                    else
                    {
                        this.transaction = null;
                        return;
                    }
                }
            }
            catch
            {
            }
        }

        public void CloseConnection()
        {
            try
            {
                if (this.connection != null)
                {
                    this.connection.Close();
                    this.connection = null;
                }

                if (this.transaction != null)
                {
                    this.transaction.Dispose();
                    this.transaction = null;
                }

                this.beginTransaction = false;
            }
            catch
            {
            }
        }

        public void BeginTransaction()
        {
            this.beginTransaction = true;
        }

        public void CommitTransaction()
        {
            try
            {
                if (this.transaction != null)
                {
                    this.transaction.Commit();
                    this.transaction.Dispose();
                }

                this.transaction = null;
                this.beginTransaction = false;
            }
            catch
            {
            }
        }

        public void RollbackTransaction()
        {
            try
            {
                if (this.transaction != null)
                {
                    this.transaction.Rollback();
                    this.transaction.Dispose();
                }

                this.transaction = null;
                this.beginTransaction = false;
            }
            catch
            {
            }
        }
        #endregion

        #region Build SQL Command
        private SqlCommand BuildSqlCommand(string storedProcName, SqlParameter[] parameterArray)
        {
            SqlCommand sqlCommand;
            OpenConnection();

            if (this.transaction == null)
            {
                sqlCommand = new SqlCommand(storedProcName, this.connection);
            }
            else
            {
                sqlCommand = new SqlCommand(storedProcName, this.connection, this.transaction);
            }

            try
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandTimeout = this.commandTimeout;

                if (parameterArray != null)
                {
                    for (int i = 0; i < parameterArray.Length; i++)
                    {
                        if (parameterArray[i] != null)
                        {
                            sqlCommand.Parameters.Add((SqlParameter)parameterArray[i]);
                        }
                    }
                }

                sqlCommand.Parameters.Add(new SqlParameter("@ReturnValue", SqlDbType.Int, 4, ParameterDirection.ReturnValue, false, 0, 0, string.Empty, DataRowVersion.Default, null));
            }
            catch
            {
            }

            return sqlCommand;
        }
        #endregion

        #region Run Stored Procedure
        public DataTable RunStoredProc_DataTable(string storedProcName, SqlParameter[] parameterArray)
        {
            DataTable dataTable = new DataTable();

            try
            {
                SqlCommand sqlCommand = BuildSqlCommand(storedProcName, parameterArray);
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
                sqlDataAdapter.Fill(dataTable);
                sqlCommand.Dispose();
                sqlDataAdapter.Dispose();

                if (this.transaction == null)
                {
                    CloseConnection();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return dataTable;
        }
        #endregion

        #region Build SQL Parameter       
        public SqlParameter BuildInputParameter(string parameterName, SqlDbType dbType, int size, object parameterValue)
        {
            return BuildParameter(parameterName, dbType, size, ParameterDirection.Input, parameterValue);
        }
        public SqlParameter BuildOutputParameter(string parameterName, SqlDbType dbType, int size)
        {
            return BuildParameter(parameterName, dbType, size, ParameterDirection.Output, null);
        }

        public SqlParameter BuildParameter(string parameterName, SqlDbType dbType, int size, ParameterDirection parameterDirection, object parameterValue)
        {
            SqlParameter sqlParameter;

            if (size > 0)
            {
                sqlParameter = new SqlParameter(parameterName, dbType, size);
            }
            else
            {
                sqlParameter = new SqlParameter(parameterName, dbType);
            }

            try
            {
                sqlParameter.Direction = parameterDirection;

                if (parameterValue != null)
                {
                    if (parameterValue == DBNull.Value)
                    {
                        sqlParameter.Value = DBNull.Value;
                    }
                    else
                    {
                        if (parameterDirection != ParameterDirection.Output)
                        {
                            sqlParameter.Value = parameterValue;
                        }
                    }
                }
            }
            catch
            {
            }

            return sqlParameter;
        }
        #endregion

    }
}