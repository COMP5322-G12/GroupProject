using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace iBargainReport
{
    public partial class OrderSummaryReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                string customerid = "";

                if (Request.QueryString["EMail"] != null)
                {
                    customerid = Request.QueryString["EMail"];
                    Session["cid"] = customerid;
                }
            }
        }

        protected void btnrun_Click(object sender, EventArgs e)
        {
            this.ReportViewer1.LocalReport.Refresh();
        }

        protected void btnmain_Click(object sender, EventArgs e)
        {
            Response.Redirect("Default.aspx");
        }
    }
}