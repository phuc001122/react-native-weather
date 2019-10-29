soNguyenTo = num => {
  for (let item of num) {
    
    if(item >= 2) {
      var dem = 0;
      for (let i = 2; i < item - 1; i++) {
        if (item % i == 0) {
          dem++;
          break;
        }
      }
      if (dem == 0) {
        console.log(`số ${item} là số nguyên tố `);
      }

    }
  }
}
let num = [1,2,3,4,5,6,7,8,9,10,28,500,498,8128];
soNguyenTo(num);