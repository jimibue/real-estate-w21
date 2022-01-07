const sort = (arr) => {
    // i is keep track of the starting point of unsorted section of array
    for(let i = 0; i< arr.length; i++ ){
        console.log('-----------------')
        console.log('finding lowest, starting at index: ', i)

        // find lowest
        // Note: set j = i because i is keep track of the start point
        // of unsorted section of array
        let lowestIndex = i
        for(let j = i; j< arr.length; j++) {
            if(arr[lowestIndex] > arr[j]){
                lowestIndex = j
            }
        }
        console.log('Lowest index ', lowestIndex)
        console.log('Lowest value was: ', arr[lowestIndex])


        console.log(`swaping index ${i} (${arr[i]}) with index ${lowestIndex} (${arr[lowestIndex]})`)
        // swap
        let temp = arr[i]
        arr[i] = arr[lowestIndex]
        arr[lowestIndex] = temp

        console.log('Array state: ', arr)
    }
}

arr1 = [5,4,3,2,1]
arr2 = [1,2,3,4,5]
arr3 = [5,2,3,4,1]
arr4 = [5,1,2,3,4]

sort(arr1)
console.log(arr1)

// sort(arr2)
// console.log(arr2)

// sort(arr3)
// console.log(arr3)

// sort(arr4)
// console.log(arr4)