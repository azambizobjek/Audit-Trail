import {folderRecId,documentRecId} from '../config'


const aclSkeleton={
    stakeholder_id:null,
    stakeholder_name:null,
    stakeholder_type_id: null,
    update:false,
    view:false,
    remove:false,
    modify_access:false,
    update_child:false,
    view_child:false,
    remove_child:false,
    attach:false
}

const folderSkeleton={
    record_id: null,
    record_type_id: folderRecId,
    parent_id: null,
    classification_id: null,
    thesaurus_id: null,
    stakeholder_id: null,
    title: null,
    is_final: false,
    is_check_out: false,
    record_no: null,
    user_defined_field: null,
    bio_access_id: null,
    action: "SAVE_RECORD",
    acl_entries: null,
    record_metadata: [{
        section_id: "sect-cff9c88c09a146538cb19681137eb0bd",
        section_field: [{
            custom_field_id: "record_no",
            value: null
        }, {
            custom_field_id: "title",
            value: null
        }]
    }]
}
const documentSkeleton={
    record_id: null,
    record_type_id: documentRecId,
    parent_id:null,
    classification_id: null,
    thesaurus_id: null,
    stakeholder_id: null,
    title: null,
    is_final: false,
    is_check_out: false,
    user_defined_field: null,
    record_no: null,
    bio_access_id: null,
    action: "SAVE_RECORD",
    acl_entries: null,
    record_metadata: [{
        section_id: "sect-5d549030476b44d882227c0dbf8922d1",
        section_field: [{
            custom_field_id: "record_no",
            value: null
        }, {
            custom_field_id: "title",
            value: null
        }, {
            custom_field_id: "parent_id",
            value: null
        }, {
            custom_field_id: "acl_id",
            value: null
        }]
    }]
}
const emailSkeleton={
    record_id: null,
    record_type_id: documentRecId,
    parent_id:null,
    classification_id: null,
    thesaurus_id: null,
    stakeholder_id: null,
    title: null,
    is_final: false,
    is_check_out: false,
    user_defined_field: null,
    record_no: null,
    bio_access_id: null,
    action: "SAVE_RECORD",
    acl_entries: null,
    record_metadata: [{
        section_id: "sect-5d549030476b44d882227c0dbf8922d1",
        section_field: [{
            custom_field_id: "record_no",
            value: null
        }, {
            custom_field_id: "title",
            value: null
        }, {
            custom_field_id: "parent_id",
            value: null
        }, {
            custom_field_id: "acl_id",
            value: null
        }]
    }, {
    section_id: "sect-a32f4499b07c490bb5600b45d877e1c0",
    section_field: [{
        custom_field_id: "cfld-1c2ebc804af041b29f081861d0105a9b",
        value: null
    }, {
        custom_field_id: "cfld-764b2d1ee4024609933626b41f84bafa",
        value: null
    }, {
        custom_field_id: "cfld-785c5c7ddf6f49ce89774ca8513db43d",
        value:null
    }, {
        custom_field_id: "cfld-aee9f2093fe24fe6a231135e8157ecde",
        value: null
    }, {
        custom_field_id: "cfld-c8b7853f3144444086ba902a552ee886",
        value: null
    }, {
        custom_field_id: "notes",
        value: null
    }]
}]
}

export{
    aclSkeleton,
    folderSkeleton,
    documentSkeleton,
    emailSkeleton
}