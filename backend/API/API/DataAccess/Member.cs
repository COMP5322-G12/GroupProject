using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace API.DataAccess
{
    /// <summary>
    /// Summary description for Member
    /// THIS IS THE CLASS TO HOLD ALL STORE PRO
    /// </summary>
    public class Member
    {
        public Member()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public String SaveMemberToDB(Int16 intMemberID, String strFirstName, String strMiddleName, String strLastName, String strGender, String strBirthDay,
                                        String strBirthMonth, String strBirthYear, String strBuilding, String strStreet, String strCity, String strState,
                                        String strZip, String strEmailAddress, String strPassword, String strContactPhone, Int16 intUpdatedBy, String strIPAddress)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            String errstring = "";

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@MemberID", SqlDbType.Int, 0,intMemberID),
                                       db.BuildInputParameter("@FirstName", SqlDbType.VarChar, 100, strFirstName),
                                       db.BuildInputParameter("@MiddleName", SqlDbType.VarChar, 100, strMiddleName),
                                       db.BuildInputParameter("@LastName", SqlDbType.VarChar, 100, strLastName),
                                       db.BuildInputParameter("@Gender", SqlDbType.VarChar, 10, strGender),
                                       db.BuildInputParameter("@BirthDay", SqlDbType.VarChar, 10, strBirthDay),
                                       db.BuildInputParameter("@BirthMonth", SqlDbType.VarChar, 10, strBirthMonth),
                                       db.BuildInputParameter("@BirthYear", SqlDbType.VarChar, 10, strBirthYear),
                                       db.BuildInputParameter("@Building", SqlDbType.VarChar, 200, strBuilding),
                                       db.BuildInputParameter("@Street", SqlDbType.VarChar, 200, strStreet),
                                       db.BuildInputParameter("@City", SqlDbType.VarChar, 50, strCity),
                                       db.BuildInputParameter("@State", SqlDbType.VarChar, 50, strState),
                                       db.BuildInputParameter("@Zip", SqlDbType.VarChar, 50, strZip),
                                       db.BuildInputParameter("@EmailAddress", SqlDbType.VarChar, 50, strEmailAddress),
                                       db.BuildInputParameter("@Password", SqlDbType.VarChar, 50, strPassword),
                                       db.BuildInputParameter("@ContactPhone", SqlDbType.VarChar, 50, strContactPhone),
                                       db.BuildInputParameter("@UpdatedBy", SqlDbType.Int, 0,intUpdatedBy),
                                       db.BuildInputParameter("@IPAddress", SqlDbType.VarChar, 50, strIPAddress)
                                       };
                dt = db.RunStoredProc_DataTable("MemberMaster_Save", param);

            }
            catch (System.Data.SqlClient.SqlException ex)
            {
                for (int i = 0; i < ex.Errors.Count; i++)
                {
                    errstring += ex.Errors[i].ToString();
                }
                return errstring;
            }
            finally
            {
                db.CloseConnection();
            }


            return "";
        }

        public String SaveMemberImageToDB(Int16 intMemberID, String strImageName, String strImagePath, Int16 intUpdatedBy, String strIPAddress)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            String errstring = "";

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@MemberID", SqlDbType.Int, 0,intMemberID),
                                       db.BuildInputParameter("@ImageName", SqlDbType.VarChar, 100, strImageName),
                                       db.BuildInputParameter("@ImagePath", SqlDbType.VarChar, 0, strImagePath),
                                       db.BuildInputParameter("@UpdatedBy", SqlDbType.Int, 0,intUpdatedBy),
                                       db.BuildInputParameter("@IPAddress", SqlDbType.VarChar, 50, strIPAddress)
                                       };
                dt = db.RunStoredProc_DataTable("MemberMasterImage_Save", param);

            }
            catch (System.Data.SqlClient.SqlException ex)
            {
                for (int i = 0; i < ex.Errors.Count; i++)
                {
                    errstring += ex.Errors[i].ToString();
                }
                return errstring;
            }
            finally
            {
                db.CloseConnection();
            }


            return "";
        }

        public DataTable GetDayOfBirthFromDB()
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            try
            {
                SqlParameter[] param = { };
                dt = db.RunStoredProc_DataTable("DayOfBirth_Get", param);

            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }
            return dt;
        }

        public DataTable GetMonthOfBirthFromDB()
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            try
            {
                SqlParameter[] param = { };
                dt = db.RunStoredProc_DataTable("MonthOfBirth_Get", param);

            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }
            return dt;
        }

        public DataTable GetYearOfBirthFromDB()
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            try
            {
                SqlParameter[] param = { };
                dt = db.RunStoredProc_DataTable("YearOfBirth_Get", param);

            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }
            return dt;
        }

        public DataTable CheckAuthFromDB(String authKey)
        {
            Database db = new Database();
            DataTable dt = new DataTable();

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@AuthKey", SqlDbType.VarChar, 50, authKey)
                                       };
                dt = db.RunStoredProc_DataTable("Authorize_Get", param);
            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }

            return dt;
        }

        public DataTable GetAuthFromDB(String strEmailAddress, String strPassword)
        {
            Database db = new Database();
            DataTable dt = new DataTable();

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@EmailAddress", SqlDbType.VarChar, 50, strEmailAddress),
                                       db.BuildInputParameter("@Password", SqlDbType.VarChar, 50, strPassword),
                                       };
                dt = db.RunStoredProc_DataTable("MemberMasterAuth_Get", param);
            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }

            return dt;
        }

        public DataTable GetMemberFromDB(String authKey)
        {
            Database db = new Database();
            DataTable dt = new DataTable();

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@AuthKey", SqlDbType.VarChar, 128, authKey)
                                       };
                dt = db.RunStoredProc_DataTable("MemberMaster_Get", param);
            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }

            return dt;
        }

        public String SaveProductToDB(out Int16 intProductID, String strProductGroup, String strStartDate, String strEndDate, String strSubject,
                                        String strContent, Int16 intOnHandStock, Double dblStandardPrice, Double dblMembershipPrice, Int16 intUpdatedBy, String strIPAddress)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            String errstring = "";

            //try
            //{
            SqlParameter[] param = {
                                       db.BuildOutputParameter("@ProductID", SqlDbType.Int, 0),
                                       db.BuildInputParameter("@ProductGroup", SqlDbType.VarChar, 50, strProductGroup),
                                       db.BuildInputParameter("@StartDate", SqlDbType.VarChar, 10, strStartDate),
                                       db.BuildInputParameter("@EndDate", SqlDbType.VarChar, 10, strEndDate),
                                       db.BuildInputParameter("@ProductSubject", SqlDbType.VarChar, 200, strSubject),
                                       db.BuildInputParameter("@ProductContent", SqlDbType.VarChar, 4000, strContent),
                                       db.BuildInputParameter("@OnHandStock", SqlDbType.Int, 0, intOnHandStock),
                                       db.BuildInputParameter("@StandardPrice", SqlDbType.Money, 0, dblStandardPrice),
                                       db.BuildInputParameter("@MembershipPrice", SqlDbType.Money, 0, dblMembershipPrice),
                                       db.BuildInputParameter("@UpdatedBy", SqlDbType.Int, 0,intUpdatedBy),
                                       db.BuildInputParameter("@IPAddress", SqlDbType.VarChar, 50, strIPAddress),
                                       };
            dt = db.RunStoredProc_DataTable("ProductMaster_Save", param);
            intProductID = Convert.ToInt16(param[0].Value);

            //}
            //catch (System.Data.SqlClient.SqlException ex)
            //{
            //    for (int i = 0; i < ex.Errors.Count; i++)
            //    {
            //        errstring += ex.Errors[i].ToString();
            //    }
            //    return errstring;
            //}
            //finally
            //{
            //    db.CloseConnection();
            //}


            return "";
        }

        public String SaveProductToDB(Int16 intProductID, String strProductGroup, String strStartDate, String strEndDate, String strSubject,
                                        String strContent, Int16 intOnHandStock, Double dblStandardPrice, Double dblMembershipPrice, Int16 intUpdatedBy, String strIPAddress)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            String errstring = "";

            //try
            //{
            SqlParameter[] param = {
                                       db.BuildInputParameter("@ProductID", SqlDbType.Int, 0, intProductID),
                                       db.BuildInputParameter("@ProductGroup", SqlDbType.VarChar, 50, strProductGroup),
                                       db.BuildInputParameter("@StartDate", SqlDbType.VarChar, 10, strStartDate),
                                       db.BuildInputParameter("@EndDate", SqlDbType.VarChar, 10, strEndDate),
                                       db.BuildInputParameter("@ProductSubject", SqlDbType.VarChar, 200, strSubject),
                                       db.BuildInputParameter("@ProductContent", SqlDbType.VarChar, 4000, strContent),
                                       db.BuildInputParameter("@OnHandStock", SqlDbType.Int, 0, intOnHandStock),
                                       db.BuildInputParameter("@StandardPrice", SqlDbType.Money, 0, dblStandardPrice),
                                       db.BuildInputParameter("@MembershipPrice", SqlDbType.Money, 0, dblMembershipPrice),
                                       db.BuildInputParameter("@UpdatedBy", SqlDbType.Int, 0,intUpdatedBy),
                                       db.BuildInputParameter("@IPAddress", SqlDbType.VarChar, 50, strIPAddress),
                                       };
            dt = db.RunStoredProc_DataTable("ProductMaster_Save", param);
            intProductID = Convert.ToInt16(param[0].Value);

            //}
            //catch (System.Data.SqlClient.SqlException ex)
            //{
            //    for (int i = 0; i < ex.Errors.Count; i++)
            //    {
            //        errstring += ex.Errors[i].ToString();
            //    }
            //    return errstring;
            //}
            //finally
            //{
            //    db.CloseConnection();
            //}


            return "";
        }

        public String SaveProductImageToDB(Int16 intProductID, String strImageName, String strImagePath, Int16 intUpdatedBy)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            String errstring = "";

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@ProductID", SqlDbType.Int, 0,intProductID),
                                       db.BuildInputParameter("@ImageName", SqlDbType.VarChar, 100, strImageName),
                                       db.BuildInputParameter("@ImagePath", SqlDbType.VarChar, 0, strImagePath),
                                       db.BuildInputParameter("@UpdatedBy", SqlDbType.Int, 0,intUpdatedBy)
                                       };
                dt = db.RunStoredProc_DataTable("ProductMasterImage_Save", param);

            }
            catch (System.Data.SqlClient.SqlException ex)
            {
                for (int i = 0; i < ex.Errors.Count; i++)
                {
                    errstring += ex.Errors[i].ToString();
                }
                return errstring;
            }
            finally
            {
                db.CloseConnection();
            }


            return "";
        }

        public DataTable GetProductOneFromDB(Int16 intProductID)
        {
            Database db = new Database();
            DataTable dt = new DataTable();

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@ProductID", SqlDbType.Int, 0, intProductID)
                                       };
                dt = db.RunStoredProc_DataTable("ProductMasterUnitItem_Get", param);
            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }

            return dt;
        }

        public DataTable GetProductFromDB(String strProductGroup, String strSearchKey)
        {
            Database db = new Database();
            DataTable dt = new DataTable();

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@ProductGroup", SqlDbType.VarChar, 50, strProductGroup),
                                       db.BuildInputParameter("@SearchKey", SqlDbType.VarChar, 200, strSearchKey)
                                       };
                dt = db.RunStoredProc_DataTable("ProductMaster_Get", param);
            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }

            return dt;
        }

        public DataTable GetMemberBargainFromDB(Int16 intMemberID, String strSearchKey)
        {
            Database db = new Database();
            DataTable dt = new DataTable();

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@MemberID", SqlDbType.Int , 0, intMemberID),
                                       db.BuildInputParameter("@SearchKey", SqlDbType.VarChar, 200, strSearchKey)
                                       };

                dt = db.RunStoredProc_DataTable("MemberBargain_Get", param);
            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }

            return dt;
        }

        public DataTable GetProductGroupMasterFromDB()
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            try
            {
                SqlParameter[] param = { };
                dt = db.RunStoredProc_DataTable("ProductGroupMaster_Get", param);

            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }
            return dt;
        }

        public String RemoveProductToDB(Int16 intProductID)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            String errstring = "";

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@ProductID", SqlDbType.Int, 0,intProductID)
                                       };
                dt = db.RunStoredProc_DataTable("ProductMaster_Delete", param);

            }
            catch (System.Data.SqlClient.SqlException ex)
            {
                for (int i = 0; i < ex.Errors.Count; i++)
                {
                    errstring += ex.Errors[i].ToString();
                }
                return errstring;
            }
            finally
            {
                db.CloseConnection();
            }


            return "";
        }

        public String SaveSalesMastertToDB(out String strInvoiceNo, Int16 intMemberID, String strCustomerName, String strBuildingToDelivery,
            String strStreetToDelivery, String strCityToDelivery, String strStateToDelivery, String strZIPToDelivery, String strEmailAddress,
            String strContactPhone, Int16 intUpdatedBy, String strIPAddress)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            String errstring = "";

            //try
            //{
            SqlParameter[] param = {
                                       db.BuildOutputParameter("@InvoiceNo", SqlDbType.VarChar, 20),
                                       db.BuildInputParameter("@MemberID", SqlDbType.Int, 0, intMemberID),
                                       db.BuildInputParameter("@CustomerName", SqlDbType.VarChar, 100, strCustomerName),
                                       db.BuildInputParameter("@BuildingToDelivery", SqlDbType.VarChar, 200, strBuildingToDelivery),
                                       db.BuildInputParameter("@StreetToDelivery ", SqlDbType.VarChar, 200, strStreetToDelivery),
                                       db.BuildInputParameter("@CityToDelivery", SqlDbType.VarChar, 50, strCityToDelivery),
                                       db.BuildInputParameter("@StateToDelivery", SqlDbType.VarChar, 50, strStateToDelivery),
                                       db.BuildInputParameter("@ZIPToDelivery", SqlDbType.VarChar, 50, strZIPToDelivery),
                                       db.BuildInputParameter("@EmailAddress", SqlDbType.VarChar, 50, strEmailAddress),
                                       db.BuildInputParameter("@ContactPhone", SqlDbType.VarChar, 50,strContactPhone),
                                       db.BuildInputParameter("@UpdatedBy", SqlDbType.Int, 0, intUpdatedBy),
                                       db.BuildInputParameter("@IPAddress", SqlDbType.VarChar, 50, strIPAddress)
                                       };
            dt = db.RunStoredProc_DataTable("SalesMaster_Save", param);
            strInvoiceNo = Convert.ToString(param[0].Value);

            //}
            //catch (System.Data.SqlClient.SqlException ex)
            //{
            //    for (int i = 0; i < ex.Errors.Count; i++)
            //    {
            //        errstring += ex.Errors[i].ToString();
            //    }
            //    return errstring;
            //}
            //finally
            //{
            //    db.CloseConnection();
            //}


            return "";
        }

        public String SaveSalesDetailToDB(String strInvoiceNo, Int16 intSN, Int16 intProductID, Int16 intOrderQty, Double dblUnitPrice, Double dblTotalPrice)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            String errstring = "";

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@InvoiceNo", SqlDbType.VarChar, 20, strInvoiceNo),
                                       db.BuildInputParameter("@SN", SqlDbType.Int, 0, intSN),
                                       db.BuildInputParameter("@ProductID", SqlDbType.Int, 0, intProductID),
                                       db.BuildInputParameter("@OrderQty", SqlDbType.Int, 0, intOrderQty),
                                       db.BuildInputParameter("@UnitPrice", SqlDbType.Float, 0, dblUnitPrice),
                                       db.BuildInputParameter("@TotalPrice", SqlDbType.Float, 0, dblTotalPrice)
                                       };
                dt = db.RunStoredProc_DataTable("SalesDetail_Save", param);
            }
            catch (System.Data.SqlClient.SqlException ex)
            {
                for (int i = 0; i < ex.Errors.Count; i++)
                {
                    errstring += ex.Errors[i].ToString();
                }
                return errstring;
            }
            finally
            {
                db.CloseConnection();
            }
            return "";
        }

        public DataTable GetInventoryEnquiryFromDB(String strFromDate, String strToDate, Int16 intMemberID)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            try
            {
                SqlParameter[] param = {
                                           db.BuildInputParameter("@FromDate", SqlDbType.VarChar, 10, strFromDate),
                                           db.BuildInputParameter("@ToDate", SqlDbType.VarChar, 10, strToDate),
                                           db.BuildInputParameter("@MemberID", SqlDbType.Int, 0, intMemberID)
                                       };
                dt = db.RunStoredProc_DataTable("RptInventoryEnquiry", param);

            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }
            return dt;
        }

        public DataTable GetPurchaseSummaryFromDB(String strFromDate, String strToDate, Int16 intMemberID)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            try
            {
                SqlParameter[] param = {
                                           db.BuildInputParameter("@FromDate", SqlDbType.VarChar, 10, strFromDate),
                                           db.BuildInputParameter("@ToDate", SqlDbType.VarChar, 10, strToDate),
                                           db.BuildInputParameter("@MemberID", SqlDbType.Int, 0, intMemberID)
                                       };
                dt = db.RunStoredProc_DataTable("RptPurchaseSummary", param);

            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }
            return dt;
        }

        public DataTable GetOrderSummaryFromDB(String strFromDate, String strToDate, Int16 intMemberID)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            try
            {
                SqlParameter[] param = {
                                           db.BuildInputParameter("@FromDate", SqlDbType.VarChar, 10, strFromDate),
                                           db.BuildInputParameter("@ToDate", SqlDbType.VarChar, 10, strToDate),
                                           db.BuildInputParameter("@MemberID", SqlDbType.Int, 0, intMemberID)
                                       };
                dt = db.RunStoredProc_DataTable("RptOrderSummary", param);

            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }
            return dt;
        }

        public DataTable GetInventoryVisitFromDB(String strFromDate, String strToDate, Int16 intMemberID)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            try
            {
                SqlParameter[] param = {
                                           db.BuildInputParameter("@FromDate", SqlDbType.VarChar, 10, strFromDate),
                                           db.BuildInputParameter("@ToDate", SqlDbType.VarChar, 10, strToDate),
                                           db.BuildInputParameter("@MemberID", SqlDbType.Int, 0, intMemberID)
                                       };
                dt = db.RunStoredProc_DataTable("RptInventoryVisitSummary", param);

            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }
            return dt;
        }

        public DataTable GetRedHotFromDB(String strSearchKey)
        {
            Database db = new Database();
            DataTable dt = new DataTable();

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@SearchKey", SqlDbType.VarChar, 200, strSearchKey)
                                       };
                dt = db.RunStoredProc_DataTable("RedHotDeal_Get", param);
            }
            catch
            {
            }
            finally
            {
                db.CloseConnection();
            }

            return dt;
        }

        public String SaveProductVisitTimesToDB(Int16 intProductID, Int16 intMemberID, string strIPAddress)
        {
            Database db = new Database();
            DataTable dt = new DataTable();
            String errstring = "";

            try
            {
                SqlParameter[] param = {
                                       db.BuildInputParameter("@ProductID", SqlDbType.Int, 0, intProductID),
                                       db.BuildInputParameter("@MemberID", SqlDbType.Int, 0, intMemberID),
                                       db.BuildInputParameter("@IPAddress", SqlDbType.VarChar, 50, strIPAddress)
                                       };
                dt = db.RunStoredProc_DataTable("ProductVisitTimes_Save", param);
            }
            catch (System.Data.SqlClient.SqlException ex)
            {
                for (int i = 0; i < ex.Errors.Count; i++)
                {
                    errstring += ex.Errors[i].ToString();
                }
                return errstring;
            }
            finally
            {
                db.CloseConnection();
            }
            return "";
        }
    }
}