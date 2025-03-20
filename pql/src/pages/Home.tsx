import React from "react"

interface propsHome{
    
}

const Home = (props: propsHome) => {

    return(
        <React.Fragment>
           <div>
            <form action="" method="post">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" />
            </form>
           </div>

           <div>
                Table
           </div>


        </React.Fragment>
    )
} 

export default Home;