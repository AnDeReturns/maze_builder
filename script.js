class Cell
{
    constructor(i, j) 
    {
        this.i = i;
        this.j = j;
        this.visited = false;
        this.topWall = true;
        this.bottomWall = true;
        this.leftWall = true;
        this.rightWall = true;
        this.wallCount = 4;
    }
    i()
    {
        return this.i;
    }
    j()
    {
        return this.j;
    }
    visited()
    {
        return this.visited;
    }
    setVisited()
    {
        this.visited = true;
    }
    topWall()
    {
        return this.topWall;
    }
    setTopWall(bool)
    {
        this.topWall = bool;
        if(bool==false)
            this.wallCount--;
        else
            this.wallCount++;
    }
    bottomWall()
    {
        return this.bottomWall;
    }
    setBottomWall(bool)
    {
        this.bottomWall = bool;
        if(bool==false)
            this.wallCount--;
        else
            this.wallCount++;
    }
    leftWall()
    {
        return this.leftWall;
    }
    setLeftWall(bool)
    {
        this.leftWall = bool;
        if(bool==false)
            this.wallCount--;
        else
            this.wallCount++;
    }
    rightWall()
    {
        return this.rightWall;
    }
    setRightWall(bool)
    {
        this.rightWall = bool;
        if(bool==false)
            this.wallCount--;
        else
            this.wallCount++;
    }
    wallCount()
    {
        return this.wallCount;
    }
}
console.info("Hello")
document.addEventListener('DOMContentLoaded', () => {
    let btn1 = document.getElementById('generate');
    btn1.addEventListener('click', (evt) => {
        let length = document.getElementById('length').value;
        let width = document.getElementById('width').value;
        var canvas = document.getElementById("results");
        var ctx = canvas.getContext("2d");
        let cells = new Array(width);
        for(let i = 0; i<width; i++)
            cells[i] = new Array(length);
        for(let i = 0; i<width; i++)
            for(let j = 0; j<length; j++)
                cells[i][j] = new Cell(i, j);
        let stack = [];
        stack.push(cells[0][0]);
        cells[0][0].setVisited(true);
        while(stack.length>0)
        {
            emptyCells = [];
            current = stack.pop();
            if(current.i+1<width && cells[current.i+1][current.j].visited==false)
                emptyCells.push(cells[current.i+1][current.j]);
            if(current.i!=0 && cells[current.i-1][current.j].visited==false)
                emptyCells.push(cells[current.i-1][current.j]);
            if(current.j+1<length && cells[current.i][current.j+1].visited==false)
                emptyCells.push(cells[current.i][current.j+1]);
            if(current.j!=0 && cells[current.i][current.j-1].visited==false)
                emptyCells.push(cells[current.i][current.j-1]);
            if(emptyCells.length>0)
            {
                stack.push(current);
                randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                if(randomCell.j>current.j)
                {
                    current.setRightWall(false);
                    randomCell.setLeftWall(false);
                }  
                if(current.j>randomCell.j)
                {
                    current.setLeftWall(false);
                    randomCell.setRightWall(false);
                }    
                if(randomCell.i>current.i)
                {
                    current.setBottomWall(false);
                    randomCell.setTopWall(false);
                }    
                if(current.i>randomCell.i)
                {
                    current.setTopWall(false);
                    randomCell.setBottomWall(false);
                } 
                randomCell.setVisited(true);   
                stack.push(randomCell);
            }
        }
        let f = 800/width;
        let f2 = 800/length;
        for(let i = 0; i<width; i++)
            for(let j = 0; j<length; j++)
            {
                if(cells[i][j].topWall==true)
                {
                    ctx.moveTo(j*f2, i*f);
                    ctx.lineTo(j*f2+f2, i*f);
                    ctx.stroke();
                }
                if(cells[i][j].bottomWall==true)
                {
                    ctx.moveTo(j*f2, i*f+f);
                    ctx.lineTo(j*f2+f2, i*f+f);
                    ctx.stroke();
                }
                if(cells[i][j].leftWall==true)
                {
                    ctx.moveTo(j*f2, i*f);
                    ctx.lineTo(j*f2, i*f+f);
                    ctx.stroke();
                }
                if(cells[i][j].rightWall==true)
                {
                    ctx.moveTo(j*f2+f2, i*f);
                    ctx.lineTo(j*f2+f2, i*f+f);
                    ctx.stroke();
                }
            }
        //solver
        for(let i = 0; i<width; i++)
            for(let j = 0; j<length; j++)
                if(cells[i][j].wallCount==3)
                {
                    let current = cells[i][j];
                    while(current.wallCount==3 && current!=cells[0][0] && current!=cells[width-1][length-1])
                    {
                        if(current.topWall==false)
                        {
                            current.setTopWall(true);
                            current = cells[current.i-1][current.j];
                            current.setBottomWall(true);
                        }
                        else if(current.bottomWall==false)
                        {
                            current.setBottomWall(true);
                            current = cells[current.i+1][current.j];
                            current.setTopWall(true);
                        }
                        else if(current.leftWall==false)
                        {
                            current.setLeftWall(true);
                            current = cells[current.i][current.j-1];
                            current.setRightWall(true);
                        }
                        else if(current.rightWall==false)
                        {
                            current.setRightWall(true);
                            current = cells[current.i][current.j+1];
                            current.setLeftWall(true);
                        }
                        console.info(current.i+" "+current.j+"  "+current.wallCount);
                    }
                }
        ctx.fillStyle = "#FF0000";
        for(let i = 0; i<width; i++)
            for(let j = 0; j<length; j++)
                if(cells[i][j].wallCount<4)
                {
                    if(cells[i][j].topWall==false)
                        ctx.fillRect(j*f2+f2/4, i*f, f2-f2/2, f*3/4);
                    if(cells[i][j].bottomWall==false)
                        ctx.fillRect(j*f2+f2/4, i*f+f/4, f2-f2/2, f*3/4);
                    if(cells[i][j].leftWall==false)
                        ctx.fillRect(j*f2, i*f+f/4, f2*3/4, f-f/2);
                    if(cells[i][j].rightWall==false)
                        ctx.fillRect(j*f2+f2/4, i*f+f/4, f2*3/4, f-f/2);
                }
        document.getElementById('length').value = '';
        document.getElementById('width').value = '';
    });
});
