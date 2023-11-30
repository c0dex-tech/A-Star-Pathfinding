document.addEventListener("DOMContentLoaded", function(){ //check the html doc, parse and load, if loaded run script 

    let node_count = 0; //dont remember tf this is but ok it's here 
    let start_pos = null; 

    const classMap = { 
        0: 'grid-cell', 
        1: 'grid-cell black', 
        2: 'grid-cell green', 
        3: 'grid-cell red', 
        4: 'grid-cell blue',
    }

    const gridContainer = document.getElementById("grid-container"); /* Save this part --- gets the container object */

    const matrix = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    ]; //1 is black and 0 is white (wall and open)


  //type name = (parameters) => {function body}; 

    matrix.forEach((row, rowIndex) => { 
        row.forEach((cell, colIndex) => { 

            const gridCell = document.createElement("div"); //creates div element stored in gridCell 
            gridCell.className = classMap[cell]; // gets the attributes of the element, if num == whatever then use that colour 

           if(classMap[cell] == 'grid-cell green'){ 
                start_pos = node_count; 
            } 
            gridCell.textContent = node_count++; // Set the content of the cell to its value
            gridContainer.appendChild(gridCell); //gridCell becomes child of gridContainer 
        }); //col loop
    }); //row loop

    let row = Math.floor(start_pos / matrix[0].length);
    let column = start_pos % matrix[0].length;

    define_vars(matrix, [column, row]); 


}); //func 




function find_surrounding(matrix, grid_pos) { //returns the surrounding positions of element in array 

    let surrounding_positions = [];

    const directions = [ 
        [0, -1], [-1,  0], [1,  0], [0,  1], //(up, left, right, down)
        [-1, -1], [1, -1], [-1 , 1],[1,  1], //(top left, top right, bottom left, bottom right)

        //  [-1, -1], [0, -1], [1, -1],
        //  [-1,  0],          [1,  0],
        //  [-1 , 1], [0,  1], [1,  1],
    ]

    for (let direction of directions){ 
        let nx = grid_pos[0] + direction[1]; 
        let ny = grid_pos[1] + direction[0]; 

        if(matrix[nx][ny] != 1 || matrix[nx][ny] != 4){ //only adds if not a 1 value (border value), doesn't do any other saftey checks 
                                                        // I didnt want a thousand nested if statements 
            surrounding_positions.push([nx,ny]);  
        }
    } 

    return surrounding_positions; 
}

function define_vars(matrix, grid_pos){
    
    let openSet = []; //array containing unevaluated grid points
    let closedSet = []; //completly done points 

    this.x = grid_pos[0]; 
    this.y = grid_pos[1]; 

    this.f = 0; //total cost of function 
    this.g = 0; //cost of function at current point 
    this.h = 0; //guess using manhatten distance 

    this.neighbours = [find_surrounding(matrix, [x,y])]; //surrounding elements of x and y 

    this.parent = undefined; //parent of node, defualt is undefined 

    openSet.push([this.x, this.y]); //give first 



}



