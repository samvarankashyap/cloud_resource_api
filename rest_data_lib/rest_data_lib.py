def get_os_server_data():
    pass

def get_os_keypair_data():
    pass

def get_os_heat_data():
    pass

def get_os_object_data():
    pass

def get_os_volume_data():
    pass

def get_aws_ec2_data():
    pass

def get_aws_s3_data():
    pass

def get_aws_ec2_key_data():
    pass

def get_aws_cfn_data():
    pass

def get_gcloud_gce_data():
    pass

def get_duffy_data():
    pass

def get_libvirt_data():
    pass

def get_rax_server_data():
    pass

def get_data(res_type, schema):
    res_grp_funcs = {
     "os_server": get_os_server_data,
     "os_keypair": get_os_keypair_data,
     "os_heat": get_os_heat_data,
     "os_object": get_os_object_data,
     "os_volume": get_os_volume_data,
     "aws_ec2": get_aws_ec2_data,
     "aws_s3": get_aws_s3_data,
     "aws_ec2_key": get_aws_ec2_key_data,
     "aws_cfn": get_aws_cfn_data,
     "gcloud_gce": get_gcloud_gce_data,
     "duffy": get_duffy_data,
     "libbvirt": get_libvirt_data,
     "rax_server": get_rax_server_data,
    }
    return res_grp_funcs[res_type]
