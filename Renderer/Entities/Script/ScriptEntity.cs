using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Progress.Sitefinity.Renderer.Designers;
using Progress.Sitefinity.Renderer.Designers.Attributes;

namespace script_widget
{
    public class ScriptEntity
    {
        /// <summary>
        /// Gets or sets the location
        /// </summary>
        public ScriptLocation Location { get; set; }

        /// <summary>
        /// Gets or sets the script link URL
        /// </summary>
        [DisplayName("Script Url")]
        [Description("Put the URL or path to the script")]
        public string Url { get; set; }

        //Checkbox yes/no
        [Group("Options")]
        [DisplayName("Async?")]
        [DefaultValue(true)]
        [DataType(customDataType: KnownFieldTypes.CheckBox)]
        public bool IsAsync { get; set; }

        //Checkbox yes/no
        [Group("Options")]
        [DisplayName("Defer?")]
        [DefaultValue(true)]
        [DataType(customDataType: KnownFieldTypes.CheckBox)]
        public bool IsDefer { get; set; }

        /// <summary>
        /// Gets or sets the script content
        /// </summary>
        [DisplayName("Script code")]
        [Description("Put the script with its wrapping tag -> e.g. <script>javascript code</script>")]
        [DataType(customDataType: KnownFieldTypes.TextArea)]
        public string Script { get; set; }
    }

    public enum ScriptLocation
    {
        Inline,
        BodyTop,
        BodyBottom
    }
}
