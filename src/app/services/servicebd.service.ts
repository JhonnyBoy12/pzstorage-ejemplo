import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Noticias } from './noticias';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a la Base de Datos
  public database!: SQLiteObject;

  //variables de creación de tablas
  tablaNoticia: string = "CREATE TABLE IF NOT EXISTS noticia(idnoticia INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(100) NOT NULL, texto TEXT NOT NULL);";

  //variables de insert por defecto en la Base de Datos
  registroNoticia: string = "INSERT or IGNORE INTO noticia(idnoticia, titulo, texto) VALUES (1, 'Soy el titulo de una noticia', 'Soy el contenido completo de la noticia insertada por defecto')";

  //variables para guardar los registros resultantes de un select
  listadoNoticias = new BehaviorSubject([]);

  //variable para manipular el estado de la Base de Datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearBD();
   }

  //funciones de retorno de observables
  fetchNoticias(): Observable<Noticias[]>{
    return this.listadoNoticias.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }

  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  crearBD(){
    //verificar la plataforma
    this.platform.ready().then(()=>{
      //procedemos a crear la Base de Datos
      this.sqlite.create({
        name: 'noticias.db',
        location:'default'
      }).then((db: SQLiteObject)=>{
        //capturar y guardar la conexión a la Base de Datos
        this.database = db;
        //llamar a la función de creación de tablas
        this.crearTablas();
        this.consultarNoticias();
        //modificar el observable del status de la base de datos
        this.isDBReady.next(true);
      }).catch(e=>{
        this.presentAlert("Creación de BD", "Error creando la BD: " + JSON.stringify(e));
      })
    })
  }

  async crearTablas(){
    try{
      //mandar a ejecutar las tablas en el orden especifico
      await this.database.executeSql(this.tablaNoticia,[]);

      //generamos los insert en caso que existan
      await this.database.executeSql(this.registroNoticia,[]);

    }catch(e){
      this.presentAlert("Creación de Tabla", "Error creando las Tablas: " + JSON.stringify(e));
    }
  }

  consultarNoticias(){
    return this.database.executeSql('SELECT * FROM noticia',[]).then(res=>{
      //variable para almacenar el resultado de la consulta
      let items: Noticias[] = [];
      //verificar si tenemos registros en la consulta
      if(res.rows.length > 0){
        //recorro el resultado
        for(var i = 0; i < res.rows.length; i++){
          //agregar el registro a mi variable
          items.push({
            idnoticia: res.rows.item(i).idnoticia,
            titulo: res.rows.item(i).titulo,
            texto: res.rows.item(i).texto
          })
        }
      }
      this.listadoNoticias.next(items as any);
    })
  }

  modificarNoticia(id:string, titulo:string, texto: string){
    return this.database.executeSql('UPDATE noticia SET titulo = ?, texto = ? WHERE idnoticia = ?',[titulo, texto, id]).then(res=>{
      this.presentAlert("Modificar", "Noticia Modificada");
      this.consultarNoticias();
    }).catch(e=>{
      this.presentAlert("Modificar", "Error: " + JSON.stringify(e));
    })

  }

  eliminarNoticia(id:string){
    return this.database.executeSql('DELETE FROM noticia WHERE idnoticia= ?',[id]).then(res=>{
      this.presentAlert("Eliminar", "Noticia Eliminada");
      this.consultarNoticias();
    }).catch(e=>{
      this.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
    })

  }

  insertarNoticia(titulo: string, texto: string){
    return this.database.executeSql('INSERT INTO noticia(titulo, texto) VALUES (?,?)',[titulo,texto]).then(res=>{
      this.presentAlert("Insertar", "Noticia Guardad");
      this.consultarNoticias();
    }).catch(e=>{
      this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
    })
  }
}
