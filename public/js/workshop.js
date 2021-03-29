$("[name=workshopRequest]").click((event) => {
    if ($("[name=workshopRequest]").is(':checked')) {
        $("[name=requestProgram]").removeAttr("disabled");
        $("[name=requestSchool]").removeAttr("disabled");
        $("[name=requestContact]").removeAttr("disabled");
    } else {
        $("[name=requestProgram]").attr("disabled", 'disabled');
        $("[name=requestSchool]").attr("disabled", 'disabled');
        $("[name=requestContact]").attr("disabled", 'disabled');
    }
})