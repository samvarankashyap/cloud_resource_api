var i = 0; /* Set Global Variable i */
function increment(){
    i += 1; /* Function for automatic increment of field's "Name" attribute. */
}

var res_grp_counter = 0; /* Set Global Variable i */
function res_grp_incr(){
    res_grp_counter += 1; /* Function for automatic increment of field's "Name" attribute. */
}
var res_grp_dict = {}
res_grp_type_options = ["","aws","openstack","gcloud"]

res_def_types = { "aws":['aws_ec2'], "openstack":["os_server"], "gcloud":["gcloud_gce"] }


/*
 * ---------------------------------------------
 *
 *  Function to Remove Form Elements Dynamically
 *  ---------------------------------------------
 *
 *  */
function removeElement(parentDiv, childDiv){
    if (childDiv == parentDiv){
        alert("The parent div cannot be removed.");
    }
    else if ($('#'+childDiv)){
        var child = $('#'+childDiv);
        var parent = $('#'+parentDiv);
        child.remove();
    }
    else{
        alert("Child div has already been removed or does not exist.");
        return false;
    }
}

function resGroupTypeOnChange(res_grp_type_id, assoc_cred_id){
	console.log("On Change Called");
	console.log(res_grp_type_id);
	if ($('#'+res_grp_type_id).val() != ""){
                var d = $('#'+res_grp_type_id).val();
                d = {"res_grp_type":d};
                console.log(d);
                $.ajax({
		    url : "/api/v1/list_res_types_by_res_grp",
		    type: "POST",
		    data : d,
    		    success: function(data, textStatus, jqXHR)
                     {
                            
                console.log(data);
                opts = "";
                for (cred in data){
                    opts += "<option value='";
                    opts += data[cred];
                    opts +="'>"+data[cred]+"</option>";
                }
                $("#"+assoc_cred_id).html(opts);
	 }
});
}
}
/*
 * ----------------------------------------------------------------------------
 *
 *  Functions that will be called upon, when user click on the Name text field.
 *
 *  ----------------------------------------------------------------------------
 *  */
function nameFunction(){
var r = document.createElement('span');
var y = document.createElement("INPUT");
y.setAttribute("type", "text");
y.setAttribute("placeholder", "Name");
var g = document.createElement("IMG");
g.setAttribute("src", "delete.png");
increment();
y.setAttribute("Name", "textelement_" + i);
r.appendChild(y);
g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
r.appendChild(g);
r.setAttribute("id", "id_" + i);
document.getElementById("myForm").appendChild(r);
}
/*
 * -----------------------------------------------------------------------------
 *
 *  Functions that will be called upon, when user click on the E-mail text field.
 *
 *  ------------------------------------------------------------------------------
 *  */
function emailFunction(){
var r = document.createElement('span');
var y = document.createElement("INPUT");
y.setAttribute("type", "text");
y.setAttribute("placeholder", "Email");
var g = document.createElement("IMG");
g.setAttribute("src", "delete.png");
increment();
y.setAttribute("Name", "textelement_" + i);
r.appendChild(y);
g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
r.appendChild(g);
r.setAttribute("id", "id_" + i);
document.getElementById("myForm").appendChild(r);
}

/*
 * -----------------------------------------------------------------------------
 *
 *  Functions that will be called upon, when user click on the Contact text field.
 *
 *  ------------------------------------------------------------------------------
 *  */
function contactFunction(){
var r = document.createElement('span');
var y = document.createElement("INPUT");
y.setAttribute("type", "text");
y.setAttribute("placeholder", "Contact");
var g = document.createElement("IMG");
g.setAttribute("src", "delete.png");
increment();
y.setAttribute("Name", "textelement_" + i);
r.appendChild(y);
g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
r.appendChild(g);
r.setAttribute("id", "id_" + i);
document.getElementById("myForm").appendChild(r);
}
/*
 * -----------------------------------------------------------------------------
 *
 *  Functions that will be called upon, when user click on the Message textarea field.
 *
 *  ------------------------------------------------------------------------------
 *  */
function textareaFunction(){
var r = document.createElement('span');
var y = document.createElement("TEXTAREA");
var g = document.createElement("IMG");
y.setAttribute("cols", "17");
y.setAttribute("placeholder", "message..");
g.setAttribute("src", "delete.png");
increment();
y.setAttribute("Name", "textelement_" + i);
r.appendChild(y);
g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
r.appendChild(g);
r.setAttribute("id", "id_" + i);
document.getElementById("myForm").appendChild(r);
}

function AddResourceGroupElements(){

         $.ajax({
                    url : "/api/v1/list_resource_group_types",
                    type: "GET",
                    data : {},
                    success: function(data, textStatus, jqXHR)
                     {

                     console.log(data);
                     data.unshift(" ");
                     res_grp_type_options = data ;
                     var r = document.createElement('span');
	        var res_grp_name = document.createElement("INPUT");
		var assoc_creds = document.createElement("SELECT");
		var del = document.createElement("INPUT");
		var res_grp_type = document.createElement("SELECT");
		var add_res_def = document.createElement("INPUT");
		var opt = ""
		for (x in res_grp_type_options){
		opt = document.createElement("OPTION");
		opt.text = res_grp_type_options[x];
		opt.value = res_grp_type_options[x] ;
		res_grp_type.appendChild(opt);
		}
		res_grp_incr()
		res_grp_name.setAttribute("type", "text");
		res_grp_name.setAttribute("placeholder", "Resource Group Name");
		res_grp_name.setAttribute("id", "resource_group_name_"+res_grp_counter);
		res_grp_type.setAttribute("id", "resource_group_type_"+res_grp_counter);
		assoc_creds.setAttribute("type", "text");
		assoc_creds.setAttribute("placeholder", "Associated Credentials");
		assoc_creds.setAttribute("id", "assoc_creds_"+res_grp_counter);
		del.setAttribute("type", "button");
		del.setAttribute("value", "X");
		add_res_def.setAttribute("type","button");
		add_res_def.setAttribute("value","+ Add Resource Def");
		res_grp_type.setAttribute("onChange", "resGroupTypeOnChange('resource_group_type_"+res_grp_counter+"','assoc_creds_"+res_grp_counter+"');");

		increment();
		r.appendChild(del);
		r.appendChild(res_grp_name);
		r.appendChild(res_grp_type);
		r.appendChild(assoc_creds);
		r.appendChild(add_res_def);
		del.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
		add_res_def.setAttribute("onclick", "AddResourceDefElements('id_" + i + "','"+"resource_group_type_"+res_grp_counter+"')");
		r.appendChild(del);
		r.setAttribute("id", "id_" + i);
		document.getElementById("myForm").appendChild(r);
		var hr = document.createElement("HR");
		document.getElementById("myForm").appendChild(hr);
                       
          }
        });
}

function AddResourceDefElements(res_grp_id, type_id ){
if (res_grp_id in res_grp_dict){
 res_grp_dict[res_grp_id] += 1;

}
else{
res_grp_dict[res_grp_id] = 1;
}

var res_grp_type_val = $("#"+type_id).val()
var r = document.createElement('span');
var res_name = document.createElement("INPUT");
var del_res = document.createElement("INPUT");
var res_type = document.createElement("SELECT");
console.log(res_grp_type_val);
for (x in res_def_types[res_grp_type_val]){

opt = document.createElement("OPTION");
opt.text =  res_def_types[res_grp_type_val][x];
opt.value =  res_def_types[res_grp_type_val][x];
res_type.appendChild(opt);
}

res_name.setAttribute("type", "text");
res_name.setAttribute("placeholder", "Resource Name");
res_name.setAttribute("id", "Resource Name");
r.appendChild(res_name);
del_res.setAttribute("type","button");
del_res.setAttribute("value","- Delete Resource Def");
del_res.setAttribute("onclick", "removeElement('"+res_grp_id+"','" +  res_grp_id+"_res_grp_def_"+res_grp_dict[res_grp_id] + "')");
r.appendChild(res_name);
r.appendChild(res_type);
r.appendChild(del_res);
r.setAttribute("id", res_grp_id+"_res_grp_def_" + res_grp_dict[res_grp_id]);
console.log(res_grp_id);
document.getElementById(res_grp_id).appendChild(r);
}

/*
 * -----------------------------------------------------------------------------
 *
 *  Functions that will be called upon, when user click on the Reset Button.
 *
 *  ------------------------------------------------------------------------------
 *  
 *  */

function resetElements(){
    document.getElementById('myForm').innerHTML = "<input type='text' value='' name='topology_name' placeholder='Topology Name'>";
    i = 0;
    res_grp_counter = 0;
    res_grp_dict= {};
}

