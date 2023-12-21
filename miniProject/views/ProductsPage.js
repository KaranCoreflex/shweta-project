import { View, Text, FlatList,StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../sagasapp/actions';
import { useNavigation } from '@react-navigation/native';

const ProductPage = () => {

const dispatch = useDispatch();
const productData=useSelector(state=>state.products);
const navigation = useNavigation();

useEffect(()=>{
  dispatch(listProducts())
},[])
console.log("productData",productData)

const handeleUpdatePress=(type,item)=>{
  if(type=="Delete"){
    navigation.navigate('AddProduct',{data:{type:type,product:item}});
  }
  if(type=="Update"){
    navigation.navigate('AddProduct',{data:{type:type,product:item}});
  }
}

const renderItem=({item})=>(
  <View style={styles.container}>
      <Text>{item.ProductUniqueId}</Text>
      <Text>{item.ProductId}</Text>
      <Text>{item.ProductName}</Text>
      <Text>{item.Description}</Text>
      <Text>{item.Price}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={()=>handeleUpdatePress("Update",item)}>
            <Text style={{color:"white"}}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handeleUpdatePress("Delete",item)}>
            <Text style={{color:"white"}}>Delete</Text>
        </TouchableOpacity>
      </View>
  </View>
)
  return (
    <View>
        <FlatList
        data={productData}
        keyExtractor={({ ProductId }) => ProductId}
        numColumns={2}
        renderItem={renderItem}
        ListFooterComponent={<Button onPress={({item})=>navigation.navigate("AddProduct",{data:{}})} title="Add Product"/>}
        />
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    backgroundColor: '#8393fc',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    width: "95%"
  },
  buttons:{
    flexDirection:'row',
    gap:5,
  },
})
export default ProductPage