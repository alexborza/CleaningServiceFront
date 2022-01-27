export function checkRequiredFields(controls: any){
    Object.keys(controls).forEach(key => {
        const control = controls[key];
        if(!control.value){
          control.setErrors({missing: {message: '[save attempt] field is missing'}});
        }
      })
}