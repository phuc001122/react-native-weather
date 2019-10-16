//Ham tinh nam nhuan am
let laNamNhuanAm = (n)=>{
    if(n % 19 == 0 || n % 19 == 3 || n % 19 == 6 || n % 19 == 9 || n % 19 == 11 || n % 19 == 14 || n % 19 == 17){
        return true;
    }
    return false;
}

//In nam nhuan giua 2 moc thoi gian
let inNamNhuan = (a,b)=>{

    console.log(`Cac nam nhuan am giua ${a} va ${b} la: `)
    for(let i = a; i <= b; i++){
        if(laNamNhuanAm(i)){
            console.log(i);
        }
    }
}

//Goi ham in nam nhuan
//inNamNhuan(1995,2031);
if(laNamNhuanAm(2015)){
    console.log("la nam nhuan");
}else{
    console.log("khong la nam nhuan");
}