import React from 'react'

export default function Navigation() {
    return (
        <div>
            <nav class="nav">
                <div class="content">
                    <div class="logo">
                        <a href="/"><img src="../../assets/Logo.png" /></a>
                    </div>
                    {/* <div class="search-box">
                        <v-text-field
                            v-on:keyup="searchProduct"
                            label="Tìm kiếm"
                            v-model="search"
                            prepend-inner-icon="mdi-magnify "
                        ></v-text-field>

                    </div> */}
                </div>
            </nav>
        </div>
    )
}
