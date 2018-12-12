// <hr/>
        // <h2>Dropped files</h2>
        // <ul>
        //   {
        //     files.map(file => 
        //      <div>
        //       <div>
        //         <img src={file.preview}/>
        //       </div>
        //      </div>
        //     )
        //   }
        // </ul>


        //better one

        // </Dropzone>
        // <hr/>
        // <h2>Dropped files</h2>
        //  <img src={this.state.image} />


        <!--   <body style="background-color: <%= Background.first.color%> "> -->


                <button onClick={this.showMenu}>
                                                        V
                                                </button> 
                                                {
                                                        this.state.showMenu ? (
                                                                <div className="menu">
                                                                        <button onClick={this.toggleColor}> color </button><br/>
                                                                        <button onClick={this.toggleImage}> image </button><br/>
                                                                        <button> Menu item 3 </button><br/>
                                                                </div>
                                                        ) : (null)
                                                        
                                                }       
