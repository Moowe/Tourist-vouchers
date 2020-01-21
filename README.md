
# Tourist-vouchers

Browser web app for generating, printing and exporting in pdf format for tourst vouchers.

## Getting Started

 * insert data into html fields
 * press print, choose option
 * when "print" is pressed, the content of the html fields is stored into a JSON object
 * pressing "List" will redirect to a list of saved vouchers
 * in the list section, search can be made by noumber, name, counterparty, date of arrival
 * all search fields look for the input string in the data
 * if you want to search only by date you must use the following format dd/mm/yyyy
 * to edit a saved voucher, pick one from the list, the changes made will overwrite the existing voucher,
 only if "print" button is pressed(even if a print option is not chosen)

### Installing

Download files and run index.html


### Pros and cons
 + no need for hosting and database engine(can be used offline)
 + easy to use
 + easy to customize
 + english/bulgarian export
 
 - doesn't operate under microsoft edge
 - doesn't have backup functionality
 - oriented for small business

## Built With
 * Html
 * Css
 * vanilla js
 * [jsPDF] (https://parall.ax/products/jspdf)
 * [foopicker js] (https://github.com/yogasaikrishna/foopicker)

