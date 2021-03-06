﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="InventoryReport.aspx.cs" Inherits="iBargainReport.InventoryReport" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        #form1 {
            height: 789px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <table>
            <tr>
                <td style="width: 80px">
                    <asp:Label ID="lbldate" runat="server">PERIOD</asp:Label>
                </td>
                <td style="width: 100px">
                    <asp:TextBox ID="txtfromdate" runat="server" Width="100px"></asp:TextBox>
                </td>
                <td style="width: 100px">
                    <asp:TextBox ID="txttodate" runat="server" Width="100px"></asp:TextBox>
                </td>
                <td style="width: auto">
                    <asp:Button ID="btnrun" runat="server" Text="GO" OnClick="btnrun_Click" />
                    <asp:Button ID="btnmain" runat="server" Text="BACK" onclick="btnmain_Click" />
                </td>
            </tr>
        </table>
        <br />

        <div>
            <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" Height="746px" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="1067px">
                <LocalReport ReportEmbeddedResource="iBargainReport.rptInventoryReport.rdlc" ReportPath="rptInventoryReport.rdlc">
                    <DataSources>
                        <rsweb:ReportDataSource DataSourceId="ObjectDataSource1" Name="DataSet1" />
                    </DataSources>
                </LocalReport>
            </rsweb:ReportViewer>
            <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" OldValuesParameterFormatString="original_{0}" SelectMethod="GetData" TypeName="DataSet1TableAdapters.RptInventoryEnquiryTableAdapter">
                <SelectParameters>
                    <asp:ControlParameter ControlID="txtfromdate" DefaultValue="01/01/2011" Name="FromDate" PropertyName="Text" Type="String" />
                    <asp:ControlParameter ControlID="txttodate" DefaultValue="31/12/2018" Name="ToDate" PropertyName="Text" Type="String" />
                    <asp:SessionParameter DefaultValue="" Name="MemberID" SessionField="cid" Type="Int32" />
                </SelectParameters>
            </asp:ObjectDataSource>

        </div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
    </form>
</body>
</html>
