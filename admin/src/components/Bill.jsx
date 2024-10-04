import React from 'react'
import { Document, Page, PDFDownloadLink, Text, View } from '@react-pdf/renderer'
const Bill = () => {
  return (
    <Document>
      <Page size="A4" style={{
        backgroundColor: '#FFFFFF',
        padding: 30,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#4B0082',
          }}>IndiaService Invoice</Text>
          <Text style={{
            fontSize: 12,
            color: '#666666',
          }}>Invoice #: {/* Add invoice number here */}</Text>
        </View>

        <View style={{
          borderBottomWidth: 1,
          borderBottomColor: '#000000',
          marginBottom: 10,
        }} />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <View>
            <Text style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>Bill To:</Text>
            <Text style={{
              fontSize: 12,
              color: '#333333',
            }}>{/* Add customer name here */}</Text>
            <Text style={{
              fontSize: 12,
              color: '#333333',
            }}>{/* Add customer address here */}</Text>
          </View>
          <View>
            <Text style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>Date:</Text>
            <Text style={{
              fontSize: 12,
              color: '#333333',
            }}>{/* Add invoice date here */}</Text>
          </View>
        </View>

        <View style={{
          backgroundColor: '#F0F8FF',
          padding: 10,
          marginBottom: 10,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#4B0082',
            marginBottom: 5,
          }}>Service Details</Text>
          <Text style={{
            fontSize: 12,
            color: '#333333',
          }}>Service: {/* Add service name here */}</Text>
          <Text style={{
            fontSize: 12,
            color: '#333333',
          }}>Status: Completed</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 30,
        }}>
          <View>
            <Text style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>Total Amount:</Text>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#4B0082',
            }}>₹ {/* Add total amount here */}</Text>
          </View>
        </View>

        <View style={{
          position: 'absolute',
          bottom: 30,
          left: 30,
          right: 30,
        }}>
          <Text style={{
            fontSize: 12,
            fontStyle: 'italic',
            color: '#666666',
            textAlign: 'center',
          }}>Thank you for choosing IndiaService. We appreciate your business!</Text>
        </View>
      </Page>
    </Document>
  )
}

export default Bill