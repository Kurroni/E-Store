import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider

//Consumer

class ProductProvider extends Component {
    state ={
        products:[], 
        detailProduct:detailProduct,
        cart: [],
        modalOpen:false,
        modalProduct: detailProduct,
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0
    };
    componentDidMount() {
        this.setProducts();
    }
    setProducts = ()=> {
        let products = [];
        storeProducts.forEach(item=>{
            const singleItem = {...item};
            products = [...products,singleItem];
        });
        this.setState(()=>{
            return {products}
        });
    };

    getItem = (id) => {
        const product = this.state.products.find(item => item.id ===id);
        return product;
    };


    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(()=> {
            return{detailProduct:product}
        })
    };
    addToCart = id =>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return{products:tempProducts, cart:[...this.state.cart, product]};
        },
        ()=>{
            this.addTotals();
        });
    };
    openModal = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct:product, modalOpen:true}
        })
    };
    closeModal = () => {
        this.setState(()=>{
           return {modalOpen:false} 
        })
    };
    increment = (id) => {
        console.log("this is increment method")
    }
    decrement = (id) => {
        console.log("this is decrement method")
    }
    removeItem = (id) => {
        console.log("item removed")
    }
    clearCart = ()=>{
        console.log("cart is cleared")
    }
    addTotals = ()=>{
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const tempTax = subTotal * 0.2;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return {
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            };
        });
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};