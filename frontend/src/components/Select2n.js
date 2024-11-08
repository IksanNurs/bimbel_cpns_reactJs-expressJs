import React, { useCallback, useEffect } from "react";
import $ from "jquery";
import "select2";
import { getTokenFromLocalStorage } from "../utils/localStorage";

const Select2n = (props) => {
  const token = getTokenFromLocalStorage();
  const handleSelectOpen = useCallback(() => {
    document.querySelector(".select2-search__field").focus();
  }, []);

  const handleSelect = useCallback(
    (event) => {
      if (props.han) {
        props.han(event);
      }
    },
    [props]
  );

  const handleCleanup = useCallback(() => {
    $(props.dataref.current).off("select2:open");
    $(props.dataref.current).off("select2:select");
    $(props.dataref.current).select2("destroy");
  }, [props.dataref]);

  useEffect(() => {
    $.fn.select2.defaults.set("theme", "bootstrap5");
    $.fn.select2.defaults.set("width", "100%");
    $.fn.select2.defaults.set("selectionCssClass", ":all:");
    const selectNode = props.dataref.current;
    $(selectNode).html("");
    // if (props.datas != null) {
    //   for (var i = 0; i < props.datas.length; i++) {
    //     var option = $("<option>")
    //       .val(props.datas[i].id)
    //       .text(props.datas[i].text);
    //     $(selectNode).append(option);
    //   }
    // }

    if (props?.state === "modal" || props?.state === "modal1") {
      $(selectNode).select2({
        data: props.datas,
        width: "100%",
        dropdownAutoWidth: true,
        allowClear: false,
        minimumInputLength: 1,
        ajax: {
          url: props?.state === "modal" ? process.env.REACT_APP_AUTH_URL + "/api/institutions-query" : process.env.REACT_APP_AUTH_URL + "/api/institutions-nonacademic-query" ,
          type: "GET",
          beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          dataType: "json",
          delay: 250,
          data(params) {
            return {
              q: params.term || "",
            };
          },
          processResults(data) {
            ////console.log(data);
            const options = data?.data?.institution?.map((item) => ({
              id: item.id,
              text: item.text,
            })) || [{ id: "", text: "No results found" }];
            return { results: options };
          },
          cache: true,
        },
      });
    } else {
      $(selectNode).select2({
        data: props.datas,
        width: "100%",
        dropdownAutoWidth: true,
        allowClear: false,
      });
    }

    $(selectNode).on("select2:open", handleSelectOpen);
    $(selectNode).on("select2:select", handleSelect);
      $(selectNode).val(props.value).trigger("change");
   

    return () =>{
      $('.select2-container').remove();
      handleCleanup()}
  }, [handleCleanup, handleSelect, handleSelectOpen, props, token]);

  return (
    <>
      <select
        ref={props.dataref}
        onBlur={handleSelect}
       className="form-select form-select-sm form-select-solid"
        name={props.name}
        data-placeholder={props.placeholder}
      />
    </>
  );
};

export default Select2n;

// const getSelect = () => {
//   const selectNode = props.dataref.current;

//   // Destroy the existing select2 instance
//   // $(props.dataref.current).select2('destroy');

//   // Clear the old options from the select element
//   $(selectNode).html('');

//   // Add the new options to the select element
//   if (props.datas != null) {
//     for (var i = 0; i < props.datas.length; i++) {
//       var option = $('<option>').val(props.datas[i].id).text(props.datas[i].text);
//       $(selectNode).append(option);
//     }
//   }

//   // Re-initialize the select2 plugin with the new data
//   $(selectNode).select2({
//     width: '100%',
//     dropdownAutoWidth: true,
//     data: props.datas
//   });

//   // Attach the select2:select event listener to the select element
//   $(selectNode).on('select2:select', (event) => {
//     if (props.han) {
//       props.han(event);
//     }
//   });

//   // Set the initial value of the select element
//   $(selectNode).val(props.value).trigger("change");
// };
