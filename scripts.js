let n = 0 ; 
let b = document.querySelector("#oktab") ; 
b ; 

let softmatrix = []  ; 
let flag ; 


function rev(str) {
   const strRev =  str.split('').reverse().join('');
   return strRev;
}


// for the couloring function that gives flood effect 
function turn (i , j )
{
   return new Promise((resolve) => {
      if(!flag )
      {
         let on = document.querySelector(`#cell_${i}_${j}`)
         if( on.style.backgroundColor !="pink" )on.style.backgroundColor = `rgb(${5+(i+j)}, ${247-10*i}, ${247-10*j})` ; 
         if(i==n-1 && j==n-1)
         {
            on.style.backgroundColor = "rgb(0,255,0)" ; 
         }
         // sets the background color 
         setTimeout(() => {
            resolve() ; 
         }, 100);
      }
      // aiting before passing 
    });
}


//asynchronus function for sweeping 
async function asyncCall()
{
   for(let i =0;  i<n ; i++)
   {
      for(let j =0 ; j<n ; j++)
      {
         await turn(j,i)
      }
   }
}


// activation and assingment 
let bt1 = document.querySelector("#bt") ; 
bt1.addEventListener("click" , assigner) ;
function assigner()
{
   flag = false ;
   softmatrix = []  ; 
   let zem = document.querySelector("#in").value ; 
   n = zem
   document.querySelector("#in").innerText = "" ; 
   console.log(n) ; 

//--------------------------------------------------------------------------------------
// array creation 
for(let i =0 ; i<n ; i++){let arr = [] ; for(let j =0 ; j<n ; j++){arr.push(1) ; }softmatrix.push(arr) ; }

function getter(s)
{
   let i , j ; 
   if(s.length === 8)
   {
      i = parseInt(s[5]) ; 
      j = parseInt(s[7]) ; 
   }
   if(s.length === 9)
   {
      if(s[7]=="_")
      {
         i = parseInt(s[5]+s[6]) ; 
         j = parseInt(s[8]) ;
      }
      if(s[6]==="_")
      {
         i = parseInt(s[5]) ; 
         j = parseInt(s[7]+s[8]) ; 
      }
   }
   if(s.length===10)
   {
        i = parseInt(s[5]+s[6]) ; 
        j = parseInt(s[8]+s[9]) ; 
   }
   return [i,j]
}

//--------------------------------------------------------------------------------------
// table creation 
let bml = '\n' ;
let add = '<tr class = "k"></tr>\n' ;  
for(let i =0 ; i<n ; i++)
{
   bml+='<tr class = "k">' ; 
   for(let j =0 ; j<n ; j++)
   {
     
     bml+=`<td id = "cell_${i}_${j}" class = "cell"></td>` ; 
   }
   bml+='</tr>' ; 
}
b.innerHTML = bml ;
let cells = document.querySelectorAll(".cell") ; 
console.log(cells) ; 
//--------------------------------------------------------------------------------------

// action event 

for(let i =1 ; i<cells.length-1 ; i++)
{   
    let cell = cells[i] ; 
    flag = true ; 
    cell.addEventListener("click"  , ()=>{change(cell)})
    cell.addEventListener("dblclick" ,()=>{change2(cell)} )
    cell.style.backgroundColor = "white" ;
     
}
document.querySelector(`#cell_0_0`).style.backgroundColor = "rgb(0,255,0)" ;
document.querySelector(`#cell_${n-1}_${n-1}`).style.backgroundColor = "rgb(0 ,255,0)" ;
function change2(cell)
{
   cell.style.backgroundColor = "white" ;
   console.log(cell.id +" : "+ getter(cell.id)) ; 
   let i = getter(cell.id)[0] ; 
   let j = getter(cell.id)[1] ; 
   softmatrix[i][j] =1 ; 
}
function change(cell)
{
   cell.style.backgroundColor = "black" ;
   console.log(cell.id +" : "+ getter(cell.id)) ; 
   let i = getter(cell.id)[0] ; 
   let j = getter(cell.id)[1] ; 
   softmatrix[i][j] =0 ; 
}

//--------------------------------------------------------------------------------------
}

// flood filling 
let bt2 = document.querySelector("#start") ; 
bt2.addEventListener("click" , ()=>{backtrack(softmatrix)})

function backtrack(softmatrix)
{
   flag = false ;
   console.log(softmatrix) ;
   console.log(FPW2(softmatrix , n )) ;

}

function isValid2(m, vis, i, j, n) {
   return i >= 0 && j >= 0 && i < n && j < n && m[i][j] === 1 && !vis[i][j];
}
function check2(m, n, i, j, vis,)
{
   return new Promise((resolve) => {
      setTimeout(() => {
        if (isValid2(m, vis, i - 1, j, n))findPath2(m, n, i - 1, j, vis);
        if (isValid2(m, vis, i, j - 1, n)) findPath2(m, n, i, j - 1, vis);     
        if (isValid2(m, vis, i, j + 1, n)) findPath2(m, n, i, j + 1, vis);
        if (isValid2(m, vis, i + 1, j, n)) findPath2(m, n, i + 1, j, vis);       
         resolve() ; 
      }, 10);
    });
}
async function findPath2(m, n, i, j, vis) {
   if (i < 0 || j < 0 || i >= n || j >= n || m[i][j] === 0 || vis[i][j]) return [];
   if (i === 0 && j === 0)  return [""];
   const ans = [];
   vis[i][j] = true;
   await turn(i,j) ; 
   await check2(m , n , i , j , vis , ans ) ; 
   vis[i][j] = false;
   return ans;
}
function FPW2(m, n) {
   const vis = Array.from({ length: n }, () => Array(n).fill(false));
   findPath2(m, n, n - 1, n - 1, vis)  ;
}

bt3 = document.querySelector("#sh") ; 
bt3.addEventListener("click" , ()=>{
   backtrack2()

   }) ; 

function backtrack2() {
   console.log(softmatrix) ; 
   console.log("haua haua");
   let path = FPW(softmatrix, n)[0];
   console.log(path);
   if(path==-1) {alert("no sollution possible :") ; return ; }
   let idx = 0,
       jdx = 0;
   let on = document.querySelector(`#cell_${idx}_${jdx}`);
   on.style.backgroundColor = "pink";
   
   for (let i = 0; i < path.length; i++) {
       if (path[i] == "D") idx += 1;
       if (path[i] == "U") idx -= 1;
       if (path[i] == "R") jdx += 1;
       if (path[i] == "L") jdx -= 1;
       console.log("working");
       let on = document.querySelector(`#cell_${idx}_${jdx}`);
       on.style.backgroundColor = "pink";
   }

   flag = true;
}

function isValid(m, vis, i, j, n) {
   return i >= 0 && j >= 0 && i < n && j < n && m[i][j] === 1 && !vis[i][j];
}

function FP(m, n) {
   const vis = Array.from({ length: n }, () => Array(n).fill(false));
   const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
   
   const queue = [];
   queue.push({ x: n - 1, y: n - 1, path: "" });
   vis[n - 1][n - 1] = true;

   while (queue.length > 0) {
       const current = queue.shift();

       for (const dir of directions) {
           const nextX = current.x + dir[0];
           const nextY = current.y + dir[1];

           if (isValid(m, vis, nextX, nextY, n)) {
               const newPath = current.path + (dir[0] === -1 ? "D" : (dir[0] === 1 ? "U" : (dir[1] === -1 ? "R" : "L")));

               if (nextX === 0 && nextY === 0) {
                   return newPath;
               }

               vis[nextX][nextY] = true;
               queue.push({ x: nextX, y: nextY, path: newPath });
           }
       }
   }

   return -1;
}

function FPW(m,n){ return [rev(FP(m,n))] ; }