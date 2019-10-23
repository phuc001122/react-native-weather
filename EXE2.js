let num = [1,2,3,4,5,6,7,8,9,10,28,500,498,8128];

let unshiftItem = num =>
{
  const item = prompt(`Nhập số muốn thêm vào đầu dãy: `);
  newLength = num.unshift(item);
  console.log(`Dãy số sau khi thêm: ${num}`);
}

unshiftItem(num);