class Item < ApplicationRecord

	validates_presence_of :title
	belongs_to :section

	has_attached_file :file, styles: { large: '1000x1000>', medium: "300x300>", thumb: "100x100#" }, default_url: "/file/:style/missing.png"
  validates_attachment_content_type :file, 
  		content_type: [ "file/jpeg", "file/gif", "file/png","file/mp4", "file/avi" ,"file/mov", "file/wmv","file/flv" ,"file/txt"]


  def as_json(_opts = {})
	{
	    id: id,
	    title: title,
	    description: description,
	    kind: kind,
	    file: file,
	    errors: errors
	}
	end

end
