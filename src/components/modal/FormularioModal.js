import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

export const FormularioModal = ({personajes}) => {

    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEnviar = (e)=>{
        e.preventDefault();
        console.log(personajes);

        const formulario = document.getElementById('form-datos'); 
        const datosFormulario = new FormData(formulario);
        const datos = new FormData();
        datos.append('datos', JSON.stringify(personajes));
        datos.append('correo', datosFormulario.get('correo'));
        const url="http://testal.mx/pruebas/ApiCorreo/envioCatalogo.php";
        fetch(url,{
            method: "POST",
            body: datos
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.status){
                Swal.fire(
                    'Envio exitoso',
                    'La lista de personajes ha sido enviada a tu correo correctamente',
                    'success'
                  )
                  formulario.reset();  
                  handleClose();
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    // footer: '<a href>Why do I have this issue?</a>'
                  })
            }

            console.log(data);
        })
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                onClick={handleClickOpen}
            >
                Enviar por correo
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Envia los {personajes.length} personajes seleccionados a tu correo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <form id="form-datos" onSubmit={handleEnviar}>
                    
                    <TextField
                        required
                        margin="dense"
                        name="correo"
                        label="Correo electrónico"
                        type="email"
                        fullWidth
                    />
                    
                    <button type="submit" className="btn btn-success">
                    Enviar
                    </button>
                    </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
