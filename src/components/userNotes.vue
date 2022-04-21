<template>
    <v-layout row wrap justify-center align-center id="main">
        <v-app-bar app color="indigo"> 
            <h2 class="white--text">Hola {{user.name}}</h2>
            <v-layout row wrap justify-end>
                <v-btn color="indigo lighten-1" fab @click="agregarNotaDialog=true">
                    <v-icon large color="white">mdi-plus</v-icon>
                </v-btn>
            </v-layout>
        </v-app-bar>

        <v-layout row wrap justify-center align-start>
            <v-card  v-for="(note, index) in notes" :key="index" class="ma-4"> 
                <v-card-text >
                    <h3>{{note.title}}</h3>
                    <p>{{note.content}}</p>
                    <v-btn depressed :color="note.state ? 'success' : 'error'" fab small> 
                        <v-icon color="white" v-if="note.state" >mdi-check</v-icon>
                        <v-icon color="white" v-else>mdi-close</v-icon>
                    </v-btn>
                    <v-btn @click="noteToEdit(index)" depressed class="ml-2" color="indigo" fab small> 
                        <v-icon color="white">mdi-square-edit-outline</v-icon>
                    </v-btn>
                    <v-btn @click="deleteDialog=true; noteId = note._id" depressed class="ml-2" color="red darken-4" fab small> 
                        <v-icon color="white">mdi-delete</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
            <v-dialog v-model="deleteDialog" :overlay="false" max-width="300px" transition="dialog-transition">
                <v-card class="pa-4">
                    <v-card-text>
                        <h2>Confirmar Eliminar Nota</h2>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="success" @click="deleteNote()">Continuar</v-btn>
                        <v-btn class="ml-3" @click="deleteDialog=false" color="error">Cancelar</v-btn>
                    </v-card-actions>
                    
                    
                </v-card>
            </v-dialog>
            <!--CUADRO DE DIALOGO PARA Actualizar NOTA-->
            <v-dialog v-model="dialog" :overlay="false" max-width="500px" transition="dialog-transition">
                <v-card class="pa-4">
                    <v-card-text>
                        <v-text-field color="black" label="Title" v-model="noteEdit.title"></v-text-field >
                        <v-text-field color="black" label="Content" v-model="noteEdit.content"></v-text-field >

                        
                        
                        
                        
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap justify-start >
                            <v-btn @click="noteEdit.state = true" color="indigo" dark depressed>MARK AS DONE</v-btn>
                            <v-btn @click="noteEdit.state = false" color="red darken-2" class="ml-3">MARK AS UNDONE</v-btn>
                        </v-layout>
                    </v-card-actions>
                    <v-card-actions class="mt-4">
                        <v-layout row wrap justify-end>
                            <v-btn  color="success" @click="updateNote(noteEdit._id)">Update Note</v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!--CUADRO DE DIALOGO PARA AGREGAR NOTA-->
            <v-dialog v-model="agregarNotaDialog" :overlay="false" max-width="500px" transition="dialog-transition">
                <v-card class="pa-4">
                    <v-card-text>
                        <v-text-field label="Title" v-model="noteToCreate.title"></v-text-field>
                        <v-textarea label="Content" v-model="noteToCreate.content"></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap justify-center>
                            <v-btn @click="addNote()" color="success">Create Note</v-btn>
                        </v-layout>
                        
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-layout>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            dialog: false,
            deleteDialog: false,
            agregarNotaDialog: false,
            user: new Object(),
            notes: [],
            noteEdit: new Object(),
            noteId: null,
            noteToCreate: new Object(),
        }
    },
    mounted(){
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user)
        this.getNotes();
    },
    methods:{
        addNote(){
            var data = {
                title: this.noteToCreate.title,
                content: this.noteToCreate.content
            };
            var userId = this.user._id;
            axios.post(`http://localhost:3000/api/notes/${userId}`, data)
            .then((res)=>{
                console.log(res.data.message);
                //console.log(data)
                //console.log(userId)
                this.getNotes();
                this.agregarNotaDialog = false;                
            })
            this.noteToCreate.title = null;
            this.noteToCreate.content = null;
        },
        getNotes(){
           var id = this.user._id; 
           axios.get(`http://localhost:3000/api/notes/${id}`)
            .then((res)=>{
                this.notes = res.data.notes
            })
        },
        noteToEdit(index){
            this.dialog = true
            this.noteEdit = this.notes[index]
        },
        updateNote(id){
            var data = {
                title: this.noteEdit.title,
                content: this.noteEdit.content,
                state: this.noteEdit.state
            }
            axios.put(`http://localhost:3000/api/notes/${id}`, data)
            .then((res)=>{
                console.log(res.data.message);
                this.getNotes();
            })

            this.dialog = false
        },
        deleteNote(){
            var id = this.noteId;
            axios.delete(`http://localhost:3000/api/notes/${id}`)
            .then((res)=>{
                console.log(res.data.message);
                this.getNotes();
            })

            this.deleteDialog = false;
        }

    }
}
</script>

<style scoped>
    #main {
        min-height: 100vh;
    }
</style>