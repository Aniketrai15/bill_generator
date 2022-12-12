let sno = 0;
let total = 0;

var bill_data = [

]

document.querySelector('#getbtn').addEventListener('click', (e) => {
    e.preventDefault();
    const id = document.getElementById('prodid').value;
    // console.log(id);
    const productObject = {
        prod_id: id
    }

    // let response;

    const xhr = new XMLHttpRequest();

    const url = `http://localhost:3000/getdata/${id}`;

    xhr.open('GET', url);

    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText);
            console.log(response)

            sno = sno + 1;
            const qty = document.getElementById('qty').value;

            $("ul").append(`<li>
                                <div class="row">
                                    <div class="col-2">${sno}</div>
                                    <div class="col-4">${response.the_prod_is.prod_name}</div>
                                    <div class="col-2">${qty}</div>
                                    <div class="col-2">${response.the_prod_is.price}</div>
                                <div class="col-2">${qty*response.the_prod_is.price}</div>
                            </div>
                            </li>`
            );
            var sr_no =sno;
            var pname = response.the_prod_is.prod_name;
            var pprice = response.the_prod_is.price;
            var ptotal = qty*response.the_prod_is.price;

            var obj = {sr_no,pname,qty,pprice,ptotal};


            total = total + qty*response.the_prod_is.price;

            ele = document.getElementById('subtotal');
            ele.innerText = total;

            bill_data.push(obj);

        }
    }

    xhr.send();
})



document.querySelector('#savebtn').addEventListener('click', (e) => {
    e.preventDefault();
    
    const bill_id = document.getElementById('billid').value;
    const cust_name = document.getElementById('billto').value;
    const productObject = {
        bill_id: bill_id,
        customer_name: cust_name,
        products: bill_data,
        total_bill:total
    }

    const xhr = new XMLHttpRequest()
    const url = `http://localhost:3000/savedata`;

    xhr.open('POST', url);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            response = JSON.parse(xhr.responseText)
            console.log(response)
        }
    }
    xhr.send(JSON.stringify(productObject));


})