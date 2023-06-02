import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../services/log.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  email:string="";
  error?:string;
  dateOfBirth: string = '';
  status:boolean=false;
  result:string="";
  
  

  
 
  // Register Variables
 
  rpatientname:string="";
  remail:string="";
  rgender:string="";
  rdateOfBirth:string="";
  rmobilenumber:number=0;
  rerror?:string;
  rstatus:boolean=false
 
 // Common variables
 
   logform:boolean=true;
  userService: any;
  rusername: any;
  constructor(private log:LogService,private route:Router,private http:HttpClient) { }

  ngOnInit(): void {
  }


  toggle(){
    this.logform=this.logform?false:true;
 }

 login():void{
   this.error="";
   if(this.email.length==0 || this.dateOfBirth.length==0)
   this.error="Fill all the fields";
   else{
     this.status=true;
     this.log.login(this.email).subscribe(
        { next:   (response:any)=>{
          // this.userService.loggedUserDetails = response.user;
          //   sessionStorage.setItem("userDetails",JSON.stringify(response.user));
            // sessionStorage.setItem("username",response.user.username);
            // sessionStorage.setItem("usertype",response.user.type);
            // sessionStorage.setItem("token",response.accessToken);
            sessionStorage.setItem("email",response.user.email);
            // this.log.username=response.user.username;
            // this.log.usertype=response.user.type;
            // this.log.token=response.accessToken;
            this.status=true;
          //   if(response.user.type=="admin")
          //       this.route.navigate(['admin/home']);
          //   else
          //       this.route.navigate(['user/home']);
           },

          error:()=>{
            this.error="Invalid Credentials";
            this.status=false;
          }}
     )
         }
        }

 //new User Registration 

 register():void{
    
    alert("Called");
    let url="http://httpbin.org/post"
     this.http.post(url,{
      patientname:this.rpatientname,
      dateOfBirth:this.rdateOfBirth,
      email:this.remail,
      mobilenumber:this.rmobilenumber,
      gender:this.rgender

     }).toPromise().then((data:any)=>{
       console.log(data)
       console.log(JSON.stringify(data.json.patientname))
       console.log(JSON.stringify(data.json.dateOfBirth))
       console.log(JSON.stringify(data.json.email))
       console.log(JSON.stringify(data.json.mobilenumber))
       console.log(JSON.stringify(data.json.gender))

       this.result=JSON.stringify(data.json.name)

     })
     this.rerror="";
     let emailregex:RegExp=/^[a-z][a-z0-9_\.]+@[a-z]{2,5}\.[a-z]{3,5}$/


     if(this.rpatientname.length==0)
     this.rerror="Fill all the fields";

     else if(this.rpatientname.length<4)
     this.rerror="Username should be atleast 4 charectars long";
     
     else if(!emailregex.test(this.remail))
     this.rerror="not in email format"

    
     else{
         this.rstatus=true;
       
                  this.rstatus=true;
                  let obj={patientname:this.rpatientname,dateOfBirth:this.dateOfBirth,type:"user",email: this.remail}
                  this.log.register(obj).subscribe({
                    next: (result:any)=>{
                         if(result.success == false)
                           alert("User already exists")
                         else{
                         alert("User successfully registered");
                         this.logform=true;
                         this.rstatus=false;
                         }
                     },
                     error: ()=>{
                         alert("There is problem , Please try again or later")
                         this.rstatus=false;
                     }}
                  )
              }
          
     }
 

}
