class Background < ApplicationRecord
	has_attached_file :image, styles: { large: '1000x1000>', medium: "300x300>", thumb: "100x100#" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

	 def as_json(_opts = {})
	 {
	    id: id,
	    name: name,
	    color: color,
	    image: image_url_large,
	    errors: errors
	  }
	 end

   def image_url_large
    image.url(:large)
   end
end
