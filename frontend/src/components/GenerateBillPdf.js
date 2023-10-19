import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  billNumber: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  address: {
    fontSize: 10,
    textAlign: "left",
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
  },
  shop: {
    display: "block",
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  tableRow: {
    fontSize: 12,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  total: {
    marginLeft: "62%",
  },
  tableCol: {
    width: "25%",

    marginBottom: 10,
  },
});

const MyDocument = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.shop}>S.V. Traders</Text>
        <Text>Date :{props.props.order.orderDate}</Text>
      </View>

      <View style={styles.address}>
        <Text>Near Velmurugan Nagar Bus Stop,</Text>
        <Text>Salem Main Road, Kailasampalaiyam,</Text>
        <Text>Tiruchengode - 637209.</Text>
      </View>

      <Text>Bill No :{props.props.order.orderNumber}</Text>
      <Text style={styles.name}>Name: {props.props.order.customerName}</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCol]}>S.No</Text>
        <Text style={[styles.tableCol]}>Description</Text>
        <Text style={[styles.tableCol]}>Quantity</Text>
        <Text style={[styles.tableCol]}>Rate</Text>
        <Text style={[styles.tableCol]}>Amount Rs</Text>
      </View>
      {props.props.order.items.map((row, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={[styles.tableCol]}>{index + 1}</Text>
          <Text style={[styles.tableCol]}>{row.name}</Text>
          <Text style={[styles.tableCol]}>{row.quantity}</Text>
          <Text style={[styles.tableCol]}>{row.price}</Text>
          <Text style={[styles.tableCol]}>{row.price * row.quantity}</Text>
        </View>
      ))}
      <View>
        <Text style={styles.total}>
          Total Amount : {props.props.order.billAmount}
        </Text>
      </View>
    </Page>
  </Document>
);

const GenerateBillPdf = (props) => (
  <>
    <button className="btn btn-info">
      <PDFDownloadLink
        style={{
          color: "white",
          textDecoration: "none",
        }}
        document={<MyDocument props={props} />}
        fileName={props.order.orderNumber + "-" + props.order.customerName}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF"
        }
      </PDFDownloadLink>
    </button>
  </>
);

export default GenerateBillPdf;
