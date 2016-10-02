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
/*
 *  * ----------------------------------------------------------------------------
 *   *
 *    *  Functions that will be called upon, first resGroupType chage
 *     *
 *      *  ----------------------------------------------------------------------------
 *       *  */

function resGroupTypeOnChange(res_grp_type_id, assoc_cred_id){
	console.log("On Change Called");
	console.log(res_grp_type_id);
	if ($('#'+res_grp_type_id).val() != ""){
                var d = $('#'+res_grp_type_id).val();
                d = {"res_grp_type":d};
                console.log(d);
                $.ajax({
		    url : "/api/v1/list_creds_by_type",
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
 *  * ----------------------------------------------------------------------------
 *   *
 *    *  Functions that will be called upon, when user click on the Name text field.
 *     *
 *      *  ----------------------------------------------------------------------------
 *       *  */


function get_schema(res_def_type){
        os_server = {
 	 "res_name": "textbox",
         "flavor" : "combobox",
         "image": "combobox",
         "count": "textbox",
         "keypair": "combobox",
         "network": "textbox"
	};
        aws_ec2 = {
 	 "res_name": "textbox",
 	 "region": "combobox",
         "flavor": "combobox",
         "count": "textbox",
         "keypair": "combobox",
         "security_group": "combobox"
        };
        gcloud_gce = {
 	 "res_name": "textbox",
         "flavor": "combobox",
         "region": "combobox",
         "image": "combobox",
         "count": "textbox"
        };
        duffy = {
 	 "res_name": "textbox",
         "version":  "textbox",
         "arch":  "textbox",
         "count":  "textbox"
        };
        aws_s3 = {
 	 "res_name": "textbox",
         "region": "combobox",
         "permission": "combobox"
        };
        os_heat = {
         "res_name": "textbox",
         "template_path": "textbox"
        };
        os_keypair = {
         "res_name": "textbox",
         "public_key_path": "textbox"
        };
        aws_ec2_key = {
         "res_name": "textbox",
         "region": "combobox",
        };
        aws_cfn = {
         "res_name":"textbox" ,
         "region": "combobox",
         "template": "combobox",
         "disable_rollback": "combobox"
        };
        os_volume = {
         "res_name": "textbox",
         "count": "textbox",
         "size": "textbox"
        };
        os_object = {
         "res_name": "textbox",
         "count": "textbox",
         "access": "combobox"
        };
        libvirt = {
         "res_name": "textbox",
         "xml": "textbox",
         "uri": "textbox"
        };
        rax_server = {
         "image": "combobox",
         "count": "textbox",
         "keypair": "combobox",
         "region": "combobox",
         "res_name": "textbox"
        };
        schema_dict = {
        "os_server": os_server,
        "aws_ec2": aws_ec2,
        "gcloud_gce": gcloud_gce,
        "duffy": duffy,
        "aws_s3": aws_s3,
        "os_heat": os_heat,
        "os_keypair": os_keypair,
        "aws_ec2_key": aws_ec2_key,
        "aws_cfn": aws_cfn,
        "os_volume": os_volume,
        "os_object": os_object,
        "libvirt": libvirt,
        "rax_server": rax_server
        }
	return schema_dict[res_def_type]
}

function get_dom_by_type(name,type){
         var dom = null;
         if(type == "textbox"){
               dom =  document.createElement("INPUT");
               dom.setAttribute("type", "text");
               dom.setAttribute("name",name);
               dom.setAttribute("placeholder",name);
         }
         if(type == "combobox"){
               dom =  document.createElement("SELECT");
               dom.setAttribute("type", "text");
               dom.setAttribute("name",name);
               dom.setAttribute("placeholder",name);
               test_vars = [" ", "test_val1","test_val2","test_val2"];
               for (x in test_vars){
                opt = document.createElement("OPTION");
                opt.text = "select "+name;
                opt.value = test_vars[x];
                dom.appendChild(opt);
                }
               return dom
         }
         return dom;
}

function get_related_data(res_type, res_grp_type, assoc_creds, schema){
         d = {}
         d["res_type"] = res_type;
         d["res_grp_type"] = res_grp_type;
         d["assoc_creds"] = assoc_creds;
         d["schema"] = JSON.stringify(schema);
         //console.log("This is schemaaa:::::::")
         //console.log(schema)
         return_data = ""
         $.ajax({
                    url : "/api/v1/get_related_data",
                    type: "POST",
                    data : d,
                    success: function(data, textStatus, jqXHR)
                     {
                      console.log("Inside get_related_data ######")
                      console.log(data);
                      return_data = data;
                     },
                     async: false
         });
         return return_data
}

function get_dom_objs(res_type, res_grp_type, assoc_creds, schema){
        console.log("$$$$$$$$$assoc_creds"+assoc_creds);
        console.log("$$$$$$$$$res_type"+res_type);
        console.log("$$$$$$$$$res_grp_type"+res_grp_type);
	dom_objs = [];
        console.log("***********values from get related data*****************");
        values = get_related_data(res_type, res_grp_type, assoc_creds , schema);
        console.log(values);
        for (e in schema){
          dom = get_dom_by_type(e,schema[e]);
          dom_objs.push(dom);
        }
        return dom_objs;
}

function resGroupTypeOnChange2(res_grp_id, res_def_id){
        console.log("On Change Called on res_def_id");
        console.log("res_grp_id################SecondtimeOnChange######"+res_grp_id);
        var res_grp_type_id = "resource_group_type_"+res_grp_id.slice(-1);
        var assoc_creds_id = "assoc_creds_"+res_grp_id.slice(-1);
        var assoc_creds = $("#"+assoc_creds_id).val()
        var res_grp_type = $("#"+res_grp_type_id).val()
        console.log("res_def_id################SecondtimeOnChange######"+res_def_id);
        var res_def_obj = document.getElementById(res_def_id);
        var select_type = $("#"+res_def_id+"_res_type").val();
        console.log("################select_type"+select_type);
        var existing_div = res_def_obj.getElementsByTagName('div')
        console.log(existing_div);
        var schema = get_schema(select_type);
        var dom_objs = get_dom_objs(select_type, res_grp_type, assoc_creds, schema);
        
        var div_dom =  document.createElement("DIV");
        if (existing_div.length == 0){
        for ( e in dom_objs){
            div_dom.appendChild(dom_objs[e]);
        }
        res_def_obj.appendChild(div_dom);
        }
        else{
            res_def_obj.removeChild(existing_div[0]);
            for ( e in dom_objs){
                div_dom.appendChild(dom_objs[e]);
            }
            res_def_obj.appendChild(div_dom);
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
console.log("############## parent")
console.log($( "#"+res_grp_id ).parent())
console.log("typeid##################################"+type_id)
console.log("res_grp_id##################################"+res_grp_id)
var res_grp_type_val = $("#"+type_id).val();
$('#'+type_id).prop('disabled', 'disabled');
var r = document.createElement('span');
//var res_name = document.createElement("INPUT");
var del_res = document.createElement("INPUT");
var res_type = document.createElement("SELECT");
console.log("res_grp_type#########################"+res_grp_type_val);
if(res_grp_type_val != " ") {
        // ajax call based on res_grp type to populate its types
         d = { "res_grp_type":res_grp_type_val };
         $.ajax({
                    url : "/api/v1/list_res_types_by_res_grp",
                    type: "POST",
                    data : d,
                    success: function(data, textStatus, jqXHR)
                     {

                         console.log(data);
                         //
                         //
                         //
                         data.unshift(" ");
                        for (x in data){
   		                opt = document.createElement("OPTION");
                		opt.text =  data[x];
                		opt.value =  data[x];
                		res_type.appendChild(opt);
        		}
                        //res_type.setAttribute("onChange", "resGroupTypeOnChange2('" +  res_grp_id+"_res_grp_def_"+res_grp_dict[res_grp_id] + "');");
        		res_type.setAttribute("onChange", "resGroupTypeOnChange2('"+res_grp_id+"','" + res_grp_id+"_res_grp_def_"+res_grp_dict[res_grp_id] + "')");
        		//res_name.setAttribute("type", "text");
        		//res_name.setAttribute("placeholder", "Resource Name");
        		res_type.setAttribute("id", res_grp_id+"_res_grp_def_"+res_grp_dict[res_grp_id]+"_res_type" );
        		//res_name.setAttribute("id", "res_def_name" );
        		//r.appendChild(res_name);
        		del_res.setAttribute("type","button");
        		del_res.setAttribute("value","- Delete Resource Def");
        		del_res.setAttribute("onclick", "removeElement('"+res_grp_id+"','" + res_grp_id+"_res_grp_def_"+res_grp_dict[res_grp_id] + "')");
        		//r.appendChild(res_name);
        		r.appendChild(res_type);
        		r.appendChild(del_res);
        		r.setAttribute("id", res_grp_id+"_res_grp_def_" + res_grp_dict[res_grp_id]);
        		console.log(res_grp_id);
        		document.getElementById(res_grp_id).appendChild(r);
                         //
                         //
                     }
        });
}
else{
  alert("resource_group_type is empty");
 }
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

