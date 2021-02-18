const x = 1
let y = 5

console.log(x, y)
y +=10
console.log(x, y)
y = 'teksti'
console.log(x, y)

console.log('-----------------------------------------------------------------')
console.log('TAULUKOT')

const t = [1, 2, 3, 4, 5]
t.push(9) //lisää taulukkoon tavaraa

t.forEach(value =>{
    console.log(value) //tulostaa kaikki
})
const t2 = t.concat(9) //uusi taulukko apinoiden vanhaa lisäten yhden luvun
console.log(t)
console.log(t2)

const m1 = t.map(value => 'möh '+ value + ' möh') //uusi taulukko alkuperäisestä muutettuna
console.log(m1)

console.log('-----------------------------------------------------------------')
console.log('OLIOT')

const olio1 = {
    name: 'Seppo Taalasmaa',
    age: 65,
    prof: 'talonmies'
}
console.log(olio1.name)
olio1.address = 'salkkarit-katu'
console.log(olio1.address)

console.log('-----------------------------------------------------------------')
console.log('FUNKTIOT')

let u = sum(1,6)

function sum(a, b){
    return a+b
}
console.log(u)

const t3 = [1, 2, 3]
const tSquared = t3.map(p => p * p)
console.log(tSquared)// tSquared on nyt [1, 4, 9]

/*const square = 4 => {
    console.log(4)
    return 4 * 4
}
*/
console.log('-----------------------------------------------------------------')
console.log('OLIOT')

//Heini olio ja metodeja, joita voi lisätä
const Heini = {
    name: 'Heini Ahven',
    age: 29,
    education: 'KTM',
    greet: function(){
        console.log('Moimoi')
    },
    doAddition: function(a, b) {
        console.log(a + b)
      },
}

Heini.getOlder = function() {
        this.age +=1;
}

console.log(Heini.age)
Heini.getOlder()
console.log(Heini.age)
Heini.greet()