const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    });


app.post("/",function(req,res){
     
    var stockSymbol= (req.body.stocks).toString();
   
    
    var baseURL="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=";
    var endingURL=".BSE&outputsize=full&apikey=OVQ5IPXU8T4QB29Q";
    var finalURL=baseURL+stockSymbol+endingURL;


    

    request(finalURL,function(error,response,body){
         var data=JSON.parse(body); 
         var dating=req.body.date;

         var jpath=data['Time Series (Daily)'][dating]['4. close'];
      
         var price=jpath;  
         // var stockSymbol= (req.body.stocks).toString();  
        // res.send(stockSymbol+ " price is "+price+" Rupees On "+dating);

        if (error) {
          console.log('Error:', error);
          } else {
            if (response.statusCode !== 200) {
                
                console.log('Status:', res.statusCode);
            } else{
              res.send(stockSymbol+ " Price was ₹"+price+" on "+dating);
            }
         
          }
    });
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT ||3000,function(){
    console.log("Server is running");
});



//API Key
// OVQ5IPXU8T4QB29Q

//List Id
//d7b3114434
