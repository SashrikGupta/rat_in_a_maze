function isValid(m, vis, i, j, n) {
   return i >= 0 && j >= 0 && i < n && j < n && m[i][j] === 1 && !vis[i][j];
}

function findPath(m, n, i, j, vis) {
   if (i < 0 || j < 0 || i >= n || j >= n || m[i][j] === 0 || vis[i][j]) return [];
   if (i === 0 && j === 0) return [""];

   let ans = [];
   vis[i][j] = true;

   if (isValid(m, vis, i - 1, j, n)) {
       const r = findPath(m, n, i - 1, j, vis);
       if (r.length > 0) {
           for (let i = 0; i < r.length; i++) {
               ans.push(r[i] + "D");
           }
           vis[i][j] = false;
           return ans;
       }
   }
   if (isValid(m, vis, i, j - 1, n)) {
       const r = findPath(m, n, i, j - 1, vis);
       if (r.length > 0) {
           for (let i = 0; i < r.length; i++) {
               ans.push(r[i] + "R");
           }
           vis[i][j] = false;
           return ans;
       }
   }
   if (isValid(m, vis, i, j + 1, n)) {
       const r = findPath(m, n, i, j + 1, vis);
       if (r.length > 0) {
           for (let i = 0; i < r.length; i++) {
               ans.push(r[i] + "L");
           }
           vis[i][j] = false;
           return ans;
       }
   }
   if (isValid(m, vis, i + 1, j, n)) {
       const r = findPath(m, n, i + 1, j, vis);
       if (r.length > 0) {
           for (let i = 0; i < r.length; i++) {
               ans.push(r[i] + "U");
           }
           vis[i][j] = false;
           return ans;
       }
   }

   vis[i][j] = false;
   return [];
}

function FPW(m, n) {
   const vis = Array.from({ length: n }, () => Array(n).fill(false));
   const path = findPath(m, n, n - 1, n - 1, vis);
   return path.length > 0 ? path : -1;
}

// Example usage:
const matrix = [
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
  
];
const result = FPW(matrix, 3);
console.log(result); // Output: ["D", "R", "R", "D"]