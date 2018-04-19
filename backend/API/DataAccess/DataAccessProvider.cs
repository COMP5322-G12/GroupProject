using API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace API.DataAccess
{
    public class DataAccessProvider
    {
        public DataAccessProvider()
        {

        }


        public String SaveMember(Int16 intMemberID, String strFirstName, String strMiddleName, String strLastName, String strGender, String strBirthDay,
                                        String strBirthMonth, String strBirthYear, String strBuilding, String strStreet, String strCity, String strState,
                                        String strZip, String strEmailAddress, String strPassword, String strContactPhone, Int16 intUpdatedBy, String strIPAddress)
        {
            String str = string.Empty;
            try
            {
                DataAccess.Member member = new Member();
                str = member.SaveMemberToDB(intMemberID, strFirstName, strMiddleName, strLastName, strGender, strBirthDay,
                                        strBirthMonth, strBirthYear, strBuilding, strStreet, strCity, strState,
                                        strZip, strEmailAddress, strPassword, strContactPhone, intUpdatedBy, strIPAddress);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            return str;
        }

        public String SaveMemberImage(Int16 intMemberID, String strImageName, String strImagePath, Int16 intUpdatedBy, String strIPAddress)
        {
            String str = string.Empty;
            try
            {
                DataAccess.Member member = new Member();
                str = member.SaveMemberImageToDB(intMemberID, strImageName, strImagePath, intUpdatedBy, strIPAddress);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            return str;
        }

        public DataTable GetDayOfBirth()
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetDayOfBirthFromDB();
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public DataTable GetMonthOfBirth()
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetMonthOfBirthFromDB();
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public DataTable GetYearOfBirth()
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetYearOfBirthFromDB();
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public short GetMemberId(string authKey)
        {
            short memberid = -1;
            try
            {
                DataAccess.Member member = new Member();
                DataTable dt = member.CheckAuthFromDB(authKey);
                if (dt != null && dt.Rows.Count > 0)
                {
                    memberid = Convert.ToInt16(dt.Rows[0][0]);
                }
            }
            catch
            {
                return -1;
            }
            return memberid;
        }

        public string GetAuth(String strEmailAddress, String strPassword)
        {
            string key = null;
            try
            {
                DataAccess.Member member = new Member();
                DataTable dt = member.GetAuthFromDB(strEmailAddress, strPassword);
                if (dt != null && dt.Rows.Count > 0)
                {
                    key = dt.Rows[0][0].ToString();
                }
            }
            catch
            {
                return null;
            }
            return key;
        }

        public LoginMember GetMember(String authKey)
        {
            LoginMember mbr = null;
            try
            {
                DataAccess.Member member = new Member();
                DataTable dt = member.GetMemberFromDB(authKey);
                if (dt != null && dt.Rows.Count > 0)
                {
                    mbr = new LoginMember();
                    mbr.MemberID = Convert.ToInt16(dt.Rows[0][0]);
                    mbr.FirstName =  dt.Rows[0][1].ToString();
                    mbr.MiddleName = dt.Rows[0][2].ToString();
                    mbr.LastName = dt.Rows[0][3].ToString();
                    mbr.Gender = dt.Rows[0][4].ToString();
                    mbr.BirthDay = dt.Rows[0][5].ToString();
                    mbr.BirthMonth = dt.Rows[0][6].ToString();
                    mbr.BirthYear = dt.Rows[0][7].ToString();
                    mbr.Building = dt.Rows[0][8].ToString();
                    mbr.Street = dt.Rows[0][9].ToString();
                    mbr.City = dt.Rows[0][10].ToString();
                    mbr.State = dt.Rows[0][11].ToString();
                    mbr.Zip = dt.Rows[0][12].ToString();
                    mbr.EMail = dt.Rows[0][13].ToString();
                    mbr.Password = dt.Rows[0][14].ToString();
                    mbr.ContactPhone = dt.Rows[0][15].ToString();
                    mbr.ImageName = dt.Rows[0][16].ToString();
                    mbr.ImagePath = dt.Rows[0][17].ToString();
                }
            }
            catch
            {
                return null;
            }
            return mbr;
        }

        public String SaveProduct(out Int16 intProductID, String strProductGroup, String strStartDate, String strEndDate, String strSubject,
                                       String strContent, Int16 intOnHandStock, Double dblStandardPrice, Double dblMembershipPrice, Int16 intUpdatedBy, String strIPAddress)
        {
            String str = string.Empty;
            try
            {
            DataAccess.Member member = new Member();
            str = member.SaveProductToDB(out intProductID, strProductGroup, strStartDate, strEndDate, strSubject, strContent, intOnHandStock,
                                   dblStandardPrice, dblMembershipPrice, intUpdatedBy, strIPAddress);
            }
            catch (Exception ex)
            {
                str = ex.Message;
                intProductID = -1;
            }
            return str;
        }

        public String SaveProduct(Int16 intProductID, String strProductGroup, String strStartDate, String strEndDate, String strSubject,
                                       String strContent, Int16 intOnHandStock, Double dblStandardPrice, Double dblMembershipPrice, Int16 intUpdatedBy, String strIPAddress)
        {
            String str = string.Empty;
            try
            {
                DataAccess.Member member = new Member();
                str = member.SaveProductToDB(intProductID, strProductGroup, strStartDate, strEndDate, strSubject, strContent, intOnHandStock,
                                       dblStandardPrice, dblMembershipPrice, intUpdatedBy, strIPAddress);
            }
            catch (Exception ex)
            {
                str = ex.Message;
            }
            return str;
        }

        public String SaveProductImage(Int16 intProductID, String strImageName, String strImagePath, Int16 intUpdatedBy)
        {
            String str = string.Empty;
            try
            {
                DataAccess.Member member = new Member();
                str = member.SaveProductImageToDB(intProductID, strImageName, strImagePath, intUpdatedBy);
            }
            catch (Exception ex)
            {
                str = ex.Message;
            }
            return str;
        }

        public DataTable GetProductOne(Int16 intProductID)
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetProductOneFromDB(intProductID);
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public bool IsProductExist(Int16 intProductID)
        {
            DataTable dt = GetProductOne(intProductID);
            if (dt == null) return false;
            return dt.Rows.Count > 0;
        }

        public DataTable GetProduct(String strProductGroup, String strSearchKey)
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetProductFromDB(strProductGroup, strSearchKey);
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public DataTable GetMemberBargain(Int16 intMemberID, String strSearchKey)
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetMemberBargainFromDB(intMemberID, strSearchKey);
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public DataTable GetProductGroupMaster()
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetProductGroupMasterFromDB();
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public String RemoveProduct(Int16 intProductID)
        {
            String str = string.Empty;
            try
            {
                DataAccess.Member member = new Member();
                str = member.RemoveProductToDB(intProductID);
            }
            catch (Exception ex)
            {
                str = ex.Message;
            }
            return str;
        }

        public String SaveSalesMaster(out String strInvoiceNo, Int16 intMemberID, String strCustomerName, String strBuildingToDelivery,
           String strStreetToDelivery, String strCityToDelivery, String strStateToDelivery, String strZIPToDelivery, String strEmailAddress,
           String strContactPhone, Int16 intUpdatedBy, String strIPAddress)
        {
            String str = string.Empty;
            try
            {
            DataAccess.Member member = new Member();
            str = member.SaveSalesMastertToDB(out strInvoiceNo, intMemberID, strCustomerName, strBuildingToDelivery, strStreetToDelivery,
                strCityToDelivery, strStateToDelivery, strZIPToDelivery, strEmailAddress, strContactPhone, intUpdatedBy, strIPAddress);
            }
            catch (Exception ex)
            {
                strInvoiceNo = "";
                return ex.Message;
            }
            return str;
        }

        public String SaveSalesDetail(String strInvoiceNo, Int16 intSN, Int16 intProductID, Int16 intOrderQty, Double dblUnitPrice, Double dblTotalPrice)
        {
            String str = string.Empty;
            try
            {
                DataAccess.Member member = new Member();
                str = member.SaveSalesDetailToDB(strInvoiceNo, intSN, intProductID, intOrderQty, dblUnitPrice, dblTotalPrice);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            return str;
        }

        public DataTable GetInventoryEnquiry(String strFromDate, String strToDate, Int16 intMemberID)
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetInventoryEnquiryFromDB(strFromDate, strToDate, intMemberID);
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public DataTable GetPurchaseSummary(String strFromDate, String strToDate, Int16 intMemberID)
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetPurchaseSummaryFromDB(strFromDate, strToDate, intMemberID);
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public DataTable GetOrderSummary(String strFromDate, String strToDate, Int16 intMemberID)
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetOrderSummaryFromDB(strFromDate, strToDate, intMemberID);
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public DataTable GetInventoryVisit(String strFromDate, String strToDate, Int16 intMemberID)
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetInventoryVisitFromDB(strFromDate, strToDate, intMemberID);
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public DataTable GetRedHot(String strSearchKey)
        {
            DataTable dt;
            try
            {
                DataAccess.Member member = new Member();
                dt = member.GetRedHotFromDB(strSearchKey);
            }
            catch
            {
                return null;
            }
            return dt;
        }

        public String SaveProductVisitTimes(Int16 intProductID, Int16 intMemberID, string strIPAddress)
        {
            String str;
            try
            {
                DataAccess.Member member = new Member();
                str = member.SaveProductVisitTimesToDB(intProductID, intMemberID, strIPAddress);
            }
            catch
            {
                return null;
            }
            return str;
        }
    }
}