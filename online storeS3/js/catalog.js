
// global vars (array)  < SESSION 2 >
var catalog=[];
var categories=[];

function fetchData(){  // SESSION 2 , block out array when done
    // get data from the server (not until session 3)
    // For now (session 2) simulate the above using an object literal (static data)

    /* catalog=[
        {code:'001',
        title: 'Dell Laptop',
        price: 1000.00,
        category: 'Computer',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRC-w5NM7Lf_wWKlJSu5YblqvdBy4xyF8RRWQ&usqp=CAU'
        },
        {code:'002',
        title: 'Samsung Tablet',
        price: 600.00,
        category: 'Tablet',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRksVQB4WLjxxWHXNp89_J8-Tp9dlF87MWncQ&usqp=CAU'
        },
        {code:'003',
        title: 'Samsung TV',
        price: 1000.00,
        category: 'Television',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLudHjRltS6TIFlmVhj01wX0OYVpL9wT3d4A&usqp=CAU'
        }
    ]  */

    //  SESSION 3
    $.ajax({
        url: 'http://restclass.azurewebsites.net/api/points',
        type: 'GET',
        success:function(allitems){
            console.log(allitems);
            // travel array
            for(var i=0;i<allitems.length; i++){
                var item=allitems[i];
                if(item.user==="Ingrid"){
                    catalog.push(item);

                    categories.push(item.category);
                }
               

            }
            displayCatalog();
            //check my user
            // push my items into the array
            displayCategories();
        },
        error:function(details){
            console.log('Error getting data', details)
        }
    });
 // other instructions 
}
/*   SESSION 4 : Display categories like displayCatalog  */

function displayCategories(){
    // travel categories array
    for(var i=0;i<categories.length;i++){
        var cats=categories[i];
        /* Add on click event in li */
        var categorySyntax=`
        <li> ${cats} </li>
        
        `;
        $('#categories').append(categorySyntax);

    }
}


// get each category from the array

// creat the syntax for the li

// append the syntax to the #categories in HTML

function displayCatalog(){
    // travel the array of items with a for loop
    // get each item 
    // display the item on the HTML
    for(var i=0;i<catalog.length;i++){
        var item=catalog[i]; // this will give us the item from the catalog.
        // display on the HTML
        // HTML syntax, display items in division
        drawItem(item);
    }

}
//  session 4 
function drawItem(item){
    var syntax=`<div class="item" id="${item.code}"> 

        <h3> <b>${item.title}</b> </h3>
        <h5 class="itemPrice">$${item.price} </h3>
        <h5> ${item.category} </h3>
        <img class="itemImage" src= "${item.image}" alt="item photo">
        <button class="btn btn-outline-success my-2 my-sm-0" id="cartButton"> Add to Cart </button>
    </div>
    `;

    $('.catalog').append(syntax);
}

function search(text){
    console.log(text);
    // clear previous results
    $('.catalog').html("");
    // travel array
    // get each item
    // if the item title contains the text
    // display the item
    for(var i=0;i<catalog.length;i++){
        var item=catalog[i];
        if(item.title.toLowerCase().includes(text.toLowerCase())||
         item.category.toLowerCase().includes(text.toLowerCase()) ||
         item.code.toLowerCase().includes(text.toLowerCase())){
            drawItem(item);
        }
    }
}

function init(){ // SESSION 2, activating array and displaying on HTML
    console.log('Catalog Page');
// SESSION 4:hook events
    $('#btn-search').click(function(){
        var text = $('#txt-search').val();
        search(text);
    });
    
    fetchData(); 
    displayCatalog();
    
}

window.onload=init;