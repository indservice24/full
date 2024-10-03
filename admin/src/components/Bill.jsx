import React from 'react'
import { Document, Page, PDFDownloadLink, Text, View } from '@react-pdf/renderer'
const Bill = () => {
  return (
    <Document>
    <Page>
        <View>
            <Text style={{color:'red', backgroundColor:'#f5f5f5'}} ></Text>
        </View>
    </Page>
    
    </Document>
  )
}

export default Bill