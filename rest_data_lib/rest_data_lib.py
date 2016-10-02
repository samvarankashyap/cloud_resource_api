def get_os_server_data(res_type,schema,assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    res_val["flavor"] = ["m1.small","m2.small","t1.small"]
    res_val["image"] = ["centos7","fedora23","fedora24"]
    res_val["keypair"] = ["testkeypair1","testkeypair2"]
    return res_val    

def get_os_keypair_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    return res_val

def get_os_heat_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    res_val["templates"] = ["test_template1","testtemplate2"]
    return res_val

def get_os_object_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    res_val["access"] = ["public","private"]
    return res_val

def get_os_volume_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    return res_val

def get_aws_ec2_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    res_val["region"] = ["us-east-1", "us-west-2"]
    res_val["flavor"] = ["t2.micro", "t1.micro"]
    res_val["keypair"] = ["testkeypair", "tkeyapair2"]
    res_val["security_group"] = ["testsg", "testsg2"]
    return res_val

def get_aws_s3_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    res_val["region"] = ["us-east-1", "us-west-2"]
    res_val["permission"] = ["private", "public"]
    
    return res_val

def get_aws_ec2_key_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    res_val["region"] = ["us-east-1", "us-west-2"]
    return res_val

def get_aws_cfn_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    res_val["region"] = ["us-east-1", "us-west-2"]
    res_val["template"] = ["testtemplate", "testtemp2"]
    res_val["rollback"] = ["yes","no"]
    return res_val

def get_gcloud_gce_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    res_val["region"] = ["us-east-1a", "us-west-1a"]
    res_val["flavor"] = ["t2.micro", "t1.micro"]
    res_val["keypair"] = ["testkeypair", "tkeyapair2"]
    res_val["security_group"] = ["testsg", "testsg2"]
    res_val["image"] = ["debain-8", "centos7"]
    return res_val

def get_duffy_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    return res_val

def get_libvirt_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    
    return res_val

def get_rax_server_data(res_type, schema, assoc_creds):
    """
    need to be implemented with realtime data
    """
    res_val = {}
    res_val["region"] = ["us-east-1a", "us-west-1a"]
    res_val["flavor"] = ["t2.micro", "t1.micro"]
    res_val["keypair"] = ["testkeypair", "tkeyapair2"]
    res_val["security_group"] = ["testsg", "testsg2"]
    res_val["image"] = ["debain-8", "centos7"]
    return res_val

def get_data(res_type, schema, assoc_creds):
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
    return res_grp_funcs[res_type](res_type, schema, assoc_creds)
