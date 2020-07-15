import React from 'react';
import BudgetItems from './BudgetItems';
import './../styles/budgetlists.css';
import Dashboard from './Dashboard'


class BudgetLists extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // items: [],
      items : this.getItems(),
      totalExpenses: 0,
      subExpenses: 0,
      foodExpenses: 0,
      housingExpenses: 0,
      entertainExpenses: 0,
      medicalExpenses: 0,
      otherExpenses: 0,
      greatestCategory: "None"
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addItemToDB = this.addItemToDB.bind(this);
    this.removeItemFromDB = this.removeItemFromDB.bind(this);
  }

  async getItems() {

    let data = await fetch('http://127.0.0.1:5000/user/budget', {
      mode : 'cors',
      method : 'GET',
      origin : 'http://127.0.0.1:3000',
      credentials : 'include'
    })
    .then(response => response.json())

    return data
  }

  addItem(e) {
    var itemArray = this.state.items;
    if (this._inputItem.value !== "" &&
      this._inputCost.value !== "" &&
      this._inputCost.value > 0 &&
      this._inputCategory.value !== "") {
      itemArray.unshift({
        name: this._inputItem.value,
        cost: this._inputCost.value,
        category: this._inputCategory.value,
        key: Date.now()
      });
      var totalCost = this.state.totalExpenses + parseFloat(this._inputCost.value);
      var subCost = this._inputCategory.value === "Subscriptions and Recurring Expenses" ? parseFloat(this._inputCost.value) + parseFloat(this.state.subExpenses) : parseFloat(this.state.subExpenses);
      var foodCost = this._inputCategory.value === "Food and Dining" ? parseFloat(this._inputCost.value) + parseFloat(this.state.foodExpenses) : parseFloat(this.state.foodExpenses);
      var housingCost = this._inputCategory.value === "Housing and Utilities" ? parseFloat(this._inputCost.value) + parseFloat(this.state.housingExpenses) : parseFloat(this.state.housingExpenses);
      var entertainCost = this._inputCategory.value === "Entertainment and Recreation" ? parseFloat(this._inputCost.value) + parseFloat(this.state.entertainExpenses) : parseFloat(this.state.entertainExpenses);
      var medicalCost = this._inputCategory.value === "Medical and Healthcare" ? parseFloat(this._inputCost.value) + parseFloat(this.state.medicalExpenses) : parseFloat(this.state.medicalExpenses);
      var otherCost = this._inputCategory.value === "Other" ? parseFloat(this._inputCost.value) + parseFloat(this.state.otherExpenses) : parseFloat(this.state.otherExpenses);
      var greatestCat = totalCost === 0 ? "None" :
        (subCost >= foodCost && subCost >= housingCost && subCost >= entertainCost && subCost >= medicalCost && subCost >= otherCost ? "Subscriptions and Recurring Expenses" :
          (foodCost >= housingCost && foodCost >= entertainCost && foodCost >= medicalCost && foodCost >= otherCost ? "Food and Dining" :
            (housingCost >= entertainCost && housingCost >= medicalCost && housingCost >= otherCost ? "Housing and Utilities" :
              (entertainCost >= medicalCost && entertainCost >= otherCost ? "Entertainment and Recreation" :
                (medicalCost >= otherCost ? "Medical and Healthcare" : "Other")))));
      this.setState({
        items: itemArray,
        totalExpenses: totalCost,
        subExpenses: subCost,
        foodExpenses: foodCost,
        housingExpenses: housingCost,
        entertainExpenses: entertainCost,
        medicalExpenses: medicalCost,
        otherExpenses: otherCost,
        greatestCategory: greatestCat


      });
      this._inputItem.value = "";
      this._inputCost.value = "";
      this._inputCategory.value = "";
      console.log(itemArray);

      e.preventDefault();

      this.addItemToDB();
    }
  }

  async addItemToDB() {

    var dt = new Date(Date.now()).toISOString()
    /* data = {
      title : this._inputItem.value,
      price : this._inputCost.value,
      date : dt,
      category : this._inputCategory.value,

    } */

    let response = await fetch('http://127.0.0.1:5000/user/budget', {
      mode : 'cors',
      method : 'POST',
      credentials : 'include',
      body : JSON.stringify(data)
    })

    return response.status
  }

  async removeItemFromDB() {
    // need some way to identify the item 
    // data = 

    let response = await fetch('http://127.0.0.1:5000/user/budget', {
      mode : 'cors',
      method : 'DELETE',
      credentials : 'include',
      body : JSON.stringify(data)
    })

    return response.status
    
  }



  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });
    var totalCost = filteredItems.reduce((prev, next) => prev + next.cost, 0);
    var subEntries = filteredItems.filter(item => item.category === "Subscriptions and Recurring Expenses");
    var subCost = subEntries.reduce((prev, next) => prev + next.cost, 0);
    var foodEntries = filteredItems.filter(item => item.category === "Food and Dining");
    var foodCost = foodEntries.reduce((prev, next) => prev + next.cost, 0);
    var housingEntries = filteredItems.filter(item => item.category === "Housing and Utilities");
    var housingCost = housingEntries.reduce((prev, next) => prev + next.cost, 0);
    var entertainmentEntries = filteredItems.filter(item => item.category === "Entertainment and Recreation");
    var entertainCost = entertainmentEntries.reduce((prev, next) => prev + next.cost, 0);
    var medicalEntries = filteredItems.filter(item => item.category === "Medical and Healthcare");
    var medicalCost = medicalEntries.reduce((prev, next) => prev + next.cost, 0);
    var otherEntries = filteredItems.filter(item => item.category === "Other");
    var otherCost = otherEntries.reduce((prev, next) => prev + next.cost, 0);
    var greatestCat = totalCost === 0 ? "None" :
      (subCost >= foodCost && subCost >= housingCost && subCost >= entertainCost && subCost >= medicalCost && subCost >= otherCost ? "Subscriptions and Recurring Expenses" :
        (foodCost >= housingCost && foodCost >= entertainCost && foodCost >= medicalCost && foodCost >= otherCost ? "Food and Dining" :
          (housingCost >= entertainCost && housingCost >= medicalCost && housingCost >= otherCost ? "Housing and Utilities" :
            (entertainCost >= medicalCost && entertainCost >= otherCost ? "Entertainment and Recreation" :
              (medicalCost >= otherCost ? "Medical and Healthcare" : "Other")))));


    this.setState({
      items: filteredItems,
      totalExpenses: totalCost,
      subExpenses: subCost,
      foodExpenses: foodCost,
      housingExpenses: housingCost,
      entertainExpenses: entertainCost,
      medicalExpenses: medicalCost,
      otherExpenses: otherCost,
      greatestCategory: greatestCat
    });

  }



  render() {

    return (
      <div className="wholePage">
        <Dashboard totalCost={this.state.totalExpenses} totalSubCost={this.state.subExpenses} greatestCategory={this.state.greatestCategory} />
        <div className="todoListMain">
          <div className="budgetheader">
            <form onSubmit={this.addItem}>
              <label>Enter budget item:  </label>
              <input id="itemInput" ref={(a) => this._inputItem = a} placeholder="Enter Item">
              </input>
              <input type="number" ref={(a) => this._inputCost = a} placeholder="Enter Amount">
              </input>
              <label>Choose a Category:  </label>
              <select id="categorysel" ref={(a) => this._inputCategory = a}>
                <option value="Subscriptions and Recurring Expenses">Subscriptions and Recurring Expenses</option>
                <option value="Food and Dining">Food and Dining</option>
                <option value="Housing and Utilities">Housing and Utilities</option>
                <option value="Entertainment and Recreation">Entertainment and Recreation</option>
                <option value="Medical and Healthcare">Medical and Healthcare</option>
                <option value="Other">Other</option>
              </select>
              <button type="submit">Add Item</button>
            </form>
          </div>
          <BudgetItems entries={this.state.items}
            delete={this.deleteItem} />
        </div>
      </div>
    )
  }
}

export default BudgetLists;