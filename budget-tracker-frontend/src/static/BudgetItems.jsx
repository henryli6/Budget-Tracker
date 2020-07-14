import React from 'react';
import './../styles/budgetitems.css';


class BudgetItems extends React.Component {
  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item) {
    return (
      <div>
        <li className="ListItem" key={item.key}>
          <div><p className='itemName'>{item.name}</p></div>
          <div><p className='itemCost'>${item.cost}</p></div>
          <div id="cancel"><p className="xtocancel" onClick={() => this.delete(item.key)}>X</p></div>
        </li>
      </div>
    )
  }

  delete(key) {
    this.props.delete(key);
  }

  render() {
    var BudgetEntries = this.props.entries;
    var subscriptionItems = BudgetEntries.filter(item => item.category === "Subscriptions and Recurring Expenses").map(this.createTasks);
    var foodItems = BudgetEntries.filter(item => item.category === "Food and Dining").map(this.createTasks);
    var housingItems = BudgetEntries.filter(item => item.category === "Housing and Utilities").map(this.createTasks);
    var entertainmentItems = BudgetEntries.filter(item => item.category === "Entertainment and Recreation").map(this.createTasks);
    var medicalItems = BudgetEntries.filter(item => item.category === "Medical and Healthcare").map(this.createTasks);
    var otherItems = BudgetEntries.filter(item => item.category === "Other").map(this.createTasks);

    return (
      <div id="listContainer">
        <div className="categoryLine">
          <ul className="subscriptionsList theList">
            <h3>Subscriptions and Recurring Expenses</h3>
            {subscriptionItems}
          </ul>
          <ul className="foodList theList">
            <h3>Food and Dining</h3>
            {foodItems}
          </ul>
          <ul className="houseList theList">
            <h3>Housing and Utilities</h3>
            {housingItems}
          </ul>
        </div>
        <div className="categoryLine">
          <ul className="entertainList theList">
            <h3>Entertainment and Recreation</h3>
            {entertainmentItems}
          </ul>
          <ul className="medicalList theList">
            <h3>Medical and Healthcare</h3>
            {medicalItems}
          </ul>
          <ul className="otherList theList">
            <h3>Other</h3>
            {otherItems}
          </ul>
        </div>
      </div>
    )
  }
}

export default BudgetItems;