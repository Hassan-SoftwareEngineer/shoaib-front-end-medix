import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    page:{
        padding: 40,
    },
    heading:{
        fontSize: 40,
        fontWeight: 'bold',
        display:"inline-block",
        textAlign:"center",
        borderBottom:"3px solid #000",
        marginBottom:40
        
    },
    header: {
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottom:"3px solid #000"

      },
      section: {
        marginBottom: 10,
        flexDirection:"row",
        justifyContent:"space-between"
      },
      sectionprimary: {
        paddingTop:10,
        flexDirection:"row",
        justifyContent:"space-between"
      },
      sectionBody: {
        marginTop:10,
        flexDirection:"row",
        justifyContent:"space-between"
      },
      sectionName: {
        marginTop:50,
        flexDirection:"row",
        justifyContent:"center",
      },
      label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10,
        display:"inline-block"
      },
      value: {
        fontSize: 14,
        display:"inline-block",
      },
      valueItalic: {
        fontSize: 24,
        display:"inline-block",
        fontStyle: "italic",
      },
      smallfont:{
        fontSize: 10,
      },
      footer:{
        marginTop: 50,
        flexDirection:"row",
        justifyContent:"space-between"
      },
      largestFont:{
fontSize:40
      }
     
});

// Create Document Component
export const MyRecepitDesign = ({ fullname,invoice, date, hospitalName, token, sr, doctor, fee, specialization, totalFee, age }) =>{ 
  return(
  <Document>
    <Page size="A4" style={styles.page}>
    <View style={styles.section}>
          <Text style={styles.valueItalic}>Invoice:</Text>
          <Text style={styles.largestFont}>000{invoice}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.smallfont}>{date}</Text>
          <Text style={styles.smallfont}>Token#</Text>
        </View>
        <Text style={{ borderBottom: 3, borderColor: '#000', paddingTop: 5,paddingBottom: 5,marginBottom:5  }} />
        <View style={styles.sectionName}>
          <Text style={styles.heading}>{hospitalName}</Text>
        </View>
        <View style={styles.sectionprimary}>
        <View style={styles.section}>
          <Text style={styles.label}>Patient Name:</Text>
          <Text style={styles.value}>{fullname}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{age}</Text>
        </View>
      </View>
      <Text style={{ borderBottom: 3, borderColor: '#000' }} />
      <View style={styles.sectionprimary}>
        <View style={styles.section}>
          <Text style={styles.label}>Sr#</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Doctor</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Specialization</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Fee</Text>
        </View>
      </View>
      <Text style={{ borderBottom: 3, borderColor: '#000' }} />

      <View style={styles.sectionBody}>
        <View style={styles.section}>
          <Text style={styles.label}>1</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>{doctor}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>{specialization}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>{fee}</Text>
        </View>
      </View>
        <View style={styles.footer}>
        <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>{totalFee}</Text>
        </View>
      </Page>
</Document>
)};

