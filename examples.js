var animals = [
    {name: 'käpy', species: 'dog'},
    {name: 'muf', species: 'cat'},
    {name: 'fuf', species: 'dog'}    
]

console.log(animals[1])

var names = animals.map(function(animal){
    return animal.name
})
 console.log(names)